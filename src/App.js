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

  const [balance, setBalance] = useState(100);
  const [bet, setBet] = useState(0);

  const [buttonState, setButtonState] = useState({
    hitDisabled: false,
    standDisabled: false,
    resetDisabled: true
  });

  const [gameState, setGameState] = useState(GameState.INIT);



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
    setIsDealerCardRevealed(false);
  }, [deckId,gameState]);

  useEffect(() => {
    if (playerScore >= 21 && gameState === GameState.PLAYER_TURN ) {
      checkWin();
      setGameState(GameState.GAME_OVER);
      setButtonState({ hitDisabled: true, standDisabled: true, resetDisabled: false });      
    }
  }, [playerScore])

   useEffect(() => {
    if (gameState === GameState.DEALER_TURN){ 
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
  }, [dealerScore,gameState])

   const placeBet = (amount) => {
    setBet(amount);
    setBalance(Math.round((balance - amount) * 100) / 100);
    setGameState(GameState.PLAYER_TURN);
    setButtonState({ hitDisabled: false, standDisabled: false, resetDisabled: true });
  }

//Starting New Game: shuffle cards and get deck id

  const newGame=(event)=>{
    event.preventDefault();
    fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then((response) => response.json())
      .then((data) => {
        setDeckId(data.deck_id);
        setDealerCards([]);
        setPlayerCards([]);
        setDealerScore(0);
        setPlayerScore(0);
        setMessage('Place your bet!');
        setGameState(GameState.BET);
        setButtonState({ hitDisabled: true, standDisabled: true, resetDisabled: true });
      });
  };

  //Draw card function: if the table is empty-draw 2 card, else draw 1 card

  const drawCard=(cards)=>{    
    const count = cards.length === 0 ? 2 : 1;
    return fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Cards drawn:", data.cards);
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

  //Reset Game: the deck is the same, only draw new cards

  const resetGame=() =>{
    setPlayerCards([]);
    setDealerCards([]);
    setDealerScore(0);
    setPlayerScore(0);
    setMessage('Place your bet!');
    setGameState(GameState.BET);
    setButtonState({ hitDisabled: true, standDisabled: true, resetDisabled: true });
    drawCard([]).then((dealerNewCards) => {
      setDealerCards(dealerNewCards);
      setDealerScore(calculateScore([dealerNewCards[1]]));
    });
    drawCard([]).then((playerNewCards) => {
      setPlayerCards(playerNewCards);
      setPlayerScore(calculateScore(playerNewCards));
    });
    setIsDealerCardRevealed(false);
  };

  //Player hits

  const hitPlayer = () => {
    drawCard(playerCards).then((newCards) => {
    const newScore = calculateScore(newCards);
    setPlayerCards(newCards);
    setPlayerScore(newScore);
    });    
  };

  //Player stands

  const stand=()=>{
    setIsDealerCardRevealed(true);
    setGameState(GameState.DEALER_TURN);
    setButtonState({ hitDisabled: true, standDisabled: true, resetDisabled: false });
    const fullDealerScore = calculateScore(dealerCards);
    setDealerScore(fullDealerScore);
  };

 //Check the winner

  const checkWin = () => {
    if (playerScore > 21) {
      setMessage("Dealer wins! (Player bust)");
    } else if (dealerScore > 21) {
      setMessage("Player wins! (Dealer bust)");
      setBalance(Math.round((balance + (bet * 2)) * 100) / 100);
    } else if (playerScore === 21 && dealerScore !== 21) {
      setMessage("Blackjack! Player wins!");
      setBalance(Math.round((balance + (bet * 2)) * 100) / 100);
    } else if (dealerScore === 21 && playerScore !== 21) {
      setMessage("Blackjack! Dealer wins!");
    } else if (playerScore > dealerScore) {
      setMessage("Player wins!");
      setBalance(Math.round((balance + (bet * 2)) * 100) / 100);
    } else if (dealerScore > playerScore) {
      setMessage("Dealer wins!");
    } else {
      setMessage("It's a tie!");
      setBalance(Math.round((balance + (bet * 1)) * 100) / 100);
    }    
  };
  


  return (
    <>
           
      <button onClick={newGame}>New Game</button>
      <Hand  title={"Dealer's Hand"}  cards={dealerCards} score={dealerScore} isRevealed={isDealerCardRevealed}/>
      <Status message={message} balance={balance}/> 
      <Hand title={"Your Hand"}  cards={playerCards}   score={playerScore} />
      <Controls onHit={hitPlayer} onStand={stand} onReset={resetGame} buttonState={buttonState}  gameState={gameState} balance={balance} betEvent={placeBet}/>
    </>
  );
}

export default App;
