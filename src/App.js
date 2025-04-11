
import './App.css';
import Status from './components/Status/Status';
import Controls from './components/Controls/Controls';
import Hand from './components/Hand/Hand';
import { useEffect, useState } from 'react';

function App() {
  const [deckId ,setDeckId]=useState(null);

  const [dealerScore, setDealerScore] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);

  const [message, setMessage] = useState('');

  const NewGame=(event)=>{
    event.preventDefault();
    fetch ("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then((response) => response.json())
      .then((data) => {
        
        setDeckId(data.deck_id);
        setDealerScore(0);
        setPlayerScore(0);
        setMessage('');
      })
  }

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
    if (dealerScore > 0 || playerScore > 0) {
      checkWin();
    }
  }, [dealerScore, playerScore]);
 

  return (
    <>
      <h1>BlackJack</h1>
      <Status message={message}/>
      <Controls/>
      <button onClick={NewGame}>New Game</button>
      <Hand  title={"Dealer's Hand"} deckId={deckId} onScoreUpdate={setDealerScore}/>
      <Hand title={"Your Hand"} deckId={deckId} onScoreUpdate={setPlayerScore}/>
    </>
  );
}

export default App;
