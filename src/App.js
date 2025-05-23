


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
        console.log("New game with deck ID:", data.deck_id);
      });
  };


  const drawCard=(cards)=>{
    
    const count = cards.length === 0 ? 2 : 1;
    return fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Cards drawn:", data.cards);
        return [...cards, ...data.cards];
      });
    }

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

  const resetGame=() =>{
    setPlayerCards([]);
    setDealerCards([]);
    setDealerScore(0);
    setPlayerScore(0);
    setMessage('');
    drawCard([]).then((dealerNewCards) => {
        setDealerCards(dealerNewCards);
        setDealerScore(calculateScore(dealerNewCards));
      });

      drawCard([]).then((playerNewCards) => {
        setPlayerCards(playerNewCards);
        setPlayerScore(calculateScore(playerNewCards));
      });
  }

  const hitPlayer = () => {
    drawCard(playerCards).then((newCards) => {
      setPlayerCards(newCards);
      setPlayerScore(calculateScore(newCards));
    });
  };

  const stand = () => {
    let currentCards = [...dealerCards];
    let score = calculateScore(currentCards);

    const drawUntil17 = () => {
      if (score < 17) {
        drawCard(currentCards).then((newCards) => {
          currentCards = newCards;
          score = calculateScore(currentCards);
          drawUntil17(); 
        });
      } else {
        setDealerCards(currentCards);
        setDealerScore(score);
      }
    };

    drawUntil17();
  };


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
  }

  
 
  useEffect(() => {
    if (deckId) {
      drawCard([]).then((dealerNewCards) => {
        setDealerCards(dealerNewCards);
        setDealerScore(calculateScore(dealerNewCards));
      });

      drawCard([]).then((playerNewCards) => {
        setPlayerCards(playerNewCards);
        setPlayerScore(calculateScore(playerNewCards));
      });
    }
  }, [deckId]);

  useEffect(() => {
    if (dealerScore > 0 || playerScore > 0) {
      checkWin();
    }
  }, [dealerScore, playerScore]);

  return (
    <>
      <h1>BlackJack</h1>
      <Status message={message}/>
      <Controls onHit={hitPlayer} onStand={stand} onReset={resetGame}/>
      <button onClick={newGame}>New Game</button>
      <Hand  title={"Dealer's Hand"}  cards={dealerCards} score={dealerScore}/>
      <Hand title={"Your Hand"}  cards={playerCards}   score={playerScore}/>
    </>
  );
}

export default App;
