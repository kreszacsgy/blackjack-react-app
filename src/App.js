import './App.css';
import Status from './components/Status/Status';
import Controls from './components/Controls/Controls';
import Hand from './components/Hand/Hand';
import { useEffect, useState } from 'react';

function App() {
  
  const [deckId ,setDeckId]=useState(null);

  const [dealerCards ,setDealerCards]=useState([]);
  const [playerCards ,setPlayerCards]=useState([]);

  const [dealerScore, setDealerScore] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);

  const [message, setMessage] = useState('');

  const [isDealerCardRevealed, setIsDealerCardRevealed] = useState(false);

  const [balance, setBalance] = useState(100);

  const [buttonState, setButtonState] = useState({
    hitDisabled: false,
    standDisabled: false,
    resetDisabled: true
  });

  const [gameState, setGameState] = useState({
    isDealerTurn: false,
    isPlayerTurn: true,
    isGameOver: false
  });

  useEffect(() => {
    if (deckId) {
      drawCard([]).then((dealerNewCards) => {
        setDealerCards(dealerNewCards);
        setDealerScore(calculateScore([dealerNewCards[1]]));
      });

      drawCard([]).then((playerNewCards) => {
        setPlayerCards(playerNewCards);
        setPlayerScore(calculateScore(playerNewCards));
      });
    }setMessage("Hit or Stand?");
    setIsDealerCardRevealed(false);
  }, [deckId]);

  useEffect(() => {
    if (playerScore >= 21 ) {
      checkWin();
      setGameState({
          isDealerTurn: false,
          isPlayerTurn: false,
          isGameOver:true
      });
      buttonState.hitDisabled = true;
      buttonState.standDisabled = true;
      buttonState.resetDisabled = false;
      setButtonState({ ...buttonState });
      
    }
  }, [playerScore])

   useEffect(() => {
    if (gameState.isGameOver && gameState.isDealerTurn){ 
      if(dealerScore > 17 ) {
      checkWin();
      buttonState.hitDisabled = true;
      buttonState.standDisabled = true;
      buttonState.resetDisabled = false;
      setButtonState({ ...buttonState });
      
    } else if(dealerScore <= 17){
      drawCard(dealerCards).then((dealerNewCards) => {
        setDealerCards(dealerNewCards);
        setDealerScore(calculateScore(dealerNewCards));
        });
    } };
  }, [dealerScore,gameState.isGameOver])

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
        setMessage('');
        setGameState({
          isDealerTurn: false,
          isPlayerTurn: true,
          isGameOver:false
        });
        setButtonState({
          hitDisabled: false,
          standDisabled: false,
          resetDisabled: true
        });
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
    setMessage('Hit or Stand?');
    setGameState({
      isDealerTurn: false,
      isPlayerTurn: true,
      isGameOver:false
    });
    setButtonState({
      hitDisabled: false,
      standDisabled: false,
      resetDisabled: true
    });
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
    setGameState({
      isDealerTurn: true,
      isPlayerTurn: false,
      isGameOver:true
    });
    buttonState.hitDisabled = true;
    buttonState.standDisabled = true;
    buttonState.resetDisabled = false;
    setButtonState({ ...buttonState });
    const fullDealerScore = calculateScore(dealerCards);
  setDealerScore(fullDealerScore);
  };

 //Check the winner

  const checkWin = () => {
    if (playerScore > 21) {
      setMessage("Dealer wins! (Player bust)");
    } else if (dealerScore > 21) {
      setMessage("Player wins! (Dealer bust)");
    } else if (playerScore === 21 && dealerScore !== 21) {
      setMessage("Blackjack! Player wins!");
    } else if (dealerScore === 21 && playerScore !== 21) {
      setMessage("Blackjack! Dealer wins!");
    } else if (playerScore > dealerScore) {
      setMessage("Player wins!");
    } else if (dealerScore > playerScore) {
      setMessage("Dealer wins!");
    } else {
      setMessage("It's a tie!");
    }    
  };
  


  return (
    <>
      <h1>BlackJack</h1>
      <Status message={message} balance={balance}/>      
      <button onClick={newGame}>New Game</button>
      <Hand  title={"Dealer's Hand"}  cards={dealerCards} score={dealerScore} isRevealed={isDealerCardRevealed}/>
      <Hand title={"Your Hand"}  cards={playerCards}   score={playerScore} />
      <Controls onHit={hitPlayer} onStand={stand} onReset={resetGame} buttonState={buttonState}/>
    </>
  );
}

export default App;
