import React from 'react';
import './App.css';
import Status from './components/Status/Status';
import Controls from './components/Controls/Controls';
import Hand from './components/Hand/Hand';
import { useEffect, useState } from 'react';

const GameState = {
  INIT: 'init',
  BET: 'bet',
  PLAYER_TURN: 'playerTurn',
  DEALER_TURN: 'dealerTurn',
  GAME_OVER: 'gameOver'
};

function App() {
  
  const [deckId ,setDeckId]=useState(null);

  const [dealerCards ,setDealerCards]=useState([]);
  const [playerCards ,setPlayerCards]=useState([]);

  const [dealerScore, setDealerScore] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);

  const [message, setMessage] = useState('Start a New Game!');

  const [isDealerCardRevealed, setIsDealerCardRevealed] = useState(false);
  const [isPlayerWins, setIsPlayerWins]=useState(false);

  const [balance, setBalance] = useState(100);
  const [bet, setBet] = useState(0);

  const [buttonState, setButtonState] = useState({
    hitDisabled: false,
    standDisabled: false,
    resetDisabled: true
  });

  const [gameState, setGameState] = useState(GameState.INIT);

  // When deck is ready and it's the player's turn, draw initial cards

  useEffect(() => {
    if (deckId && gameState === GameState.PLAYER_TURN) {
      drawCard([]).then((dealerNewCards) => {
        setDealerCards(dealerNewCards);
        setDealerScore(calculateScore([dealerNewCards[1]]));
      });

      drawCard([]).then((playerNewCards) => {
        setPlayerCards(playerNewCards);
        setPlayerScore(calculateScore(playerNewCards));
      });
      setMessage("Hit or Stand?");      
    }    
  }, [deckId,gameState]);

  // Automatically check for win if player score reaches 21

  useEffect(() => {
    if (playerScore >= 21 && gameState === GameState.PLAYER_TURN ) {
      checkWin();
      setGameState(GameState.GAME_OVER);
      setButtonState({ hitDisabled: true, standDisabled: true, resetDisabled: false });      
    }
  }, [playerScore]);

  // Dealer's logic: if score < 17, draw more cards

   useEffect(() => {
    if (gameState === GameState.DEALER_TURN){ 
      setIsDealerCardRevealed(true);
      if(dealerScore >= 17 ) {
        checkWin();
        setGameState(GameState.GAME_OVER);
        setButtonState({ hitDisabled: true, standDisabled: true, resetDisabled: false });
      
    } else {
        drawCard(dealerCards).then((dealerNewCards) => {
          setDealerCards(dealerNewCards);
          setDealerScore(calculateScore(dealerNewCards));
        });
    } };
  }, [dealerScore,gameState]);

  // Reset if player runs out of money

  useEffect(() => {
    if (balance <= 0 && gameState===GameState.GAME_OVER) {
      setGameState(GameState.INIT);
      setMessage("Empty Wallet! Play Again?");
    }
  }, [balance,gameState]);

  // Place bet and subtract from balance

  const placeBet = (amount) => {
    setBet(amount);
    setBalance(Math.round((balance - amount) * 100) / 100);
    setGameState(GameState.PLAYER_TURN);
    setButtonState({ hitDisabled: false, standDisabled: false, resetDisabled: true });
  }

   // Start a new game: get a new shuffled deck

  const newGame=()=>{
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then((response) => response.json())
      .then((data) => {
        setDeckId(data.deck_id);
        setDealerCards([]);
        setPlayerCards([]);
        setDealerScore(0);
        setPlayerScore(0);
        setMessage('Place your bet!');
        setIsDealerCardRevealed(false);
        if (balance <= 0) {// Refill balance if empty
          setBalance(100); 
        }
        setGameState(GameState.BET);
        setIsPlayerWins(false);
      });
  };

  // Draw cards from the deck. If no cards yet, draw 2; otherwise, 1.

  const drawCard=(cards)=>{    
    const count = cards.length === 0 ? 2 : 1;
    return fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`)
      .then((response) => response.json())
      .then((data) => {
        return [...cards, ...data.cards];
      });
  };

  //Calculate scores

  const calculateScore = (cards) => {
    let total = 0;
    let aceCount = 0;

    cards.forEach((card) => {
      if (['KING', 'QUEEN', 'JACK'].includes(card.value)) {
        total += 10;
      } else if (card.value === 'ACE') {
        aceCount++;
      } else {
        total += parseInt(card.value);
      }
    });

    for (let i = 0; i < aceCount; i++) {
      total += total + 11 > 21 ? 1 : 11;
    }

    return total;
  };


  //Player hits: draw one more card

  const hitPlayer = () => {
    drawCard(playerCards).then((newCards) => {
    const newScore = calculateScore(newCards);
    setPlayerCards(newCards);
    setPlayerScore(newScore);
    });    
  };

  //Player stands: dealer's turn

  const stand=()=>{    
    setGameState(GameState.DEALER_TURN);
    setButtonState({ hitDisabled: true, standDisabled: true, resetDisabled: false });
    const fullDealerScore = calculateScore(dealerCards);
    setDealerScore(fullDealerScore);
    setIsDealerCardRevealed(true);
  };

 //Check the winner

  const checkWin = () => {
    if (playerScore > 21) {
      setMessage("Dealer wins! (You bust)");
    } else if (dealerScore > 21) {
      setMessage("You win! (Dealer bust)");
      setBalance(Math.round((balance + (bet * 2)) * 100) / 100);
      setIsPlayerWins(true);
    } else if (playerScore === 21 && dealerScore !== 21) {
      setMessage("Blackjack! You win!");
      setBalance(Math.round((balance + (bet * 2)) * 100) / 100);
      setIsPlayerWins(true);
    } else if (dealerScore === 21 && playerScore !== 21) {
      setMessage("Blackjack! Dealer wins!");
    } else if (playerScore > dealerScore) {
      setMessage("You win!");
      setBalance(Math.round((balance + (bet * 2)) * 100) / 100);
      setIsPlayerWins(true);
    } else if (dealerScore > playerScore) {
      setMessage("Dealer wins!");
    } else {
      setMessage("It's a tie!");
      setBalance(Math.round((balance + (bet * 1)) * 100) / 100);
    }    
  };

  return (
    <>         
      <Hand  
        title={"Dealer's Hand"}  
        cards={dealerCards} 
        score={dealerScore} 
        isRevealed={isDealerCardRevealed}
      />
      <Status message={message} balance={balance} isPlayerWins={isPlayerWins}/> 
      <Hand title={"Your Hand"}  cards={playerCards}   score={playerScore} />
      <Controls 
        onStart={newGame}
        onHit={hitPlayer} 
        onStand={stand} 
        onReset={newGame} 
        buttonState={buttonState}  
        gameState={gameState} 
        balance={balance} 
        betEvent={placeBet}
      />
    </>
  );
}

export default App;
