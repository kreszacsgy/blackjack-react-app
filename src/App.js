
import './App.css';
import Status from './components/Status/Status';
import Controls from './components/Controls/Controls';
import Hand from './components/Hand/Hand';
import { useState } from 'react';

function App() {
  const [deckId ,setDeckId]=useState(null);

  const NewGame=(event)=>{
    event.preventDefault();
    fetch ("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
      .then((response) => response.json())
      .then((data) => {
        
        setDeckId(data.deck_id);
      })
  }
 

  return (
    <>
      <h1>BlackJack</h1>
      <Status/>
      <Controls/>
      <button onClick={NewGame}>New Game</button>
      <Hand  title={"Dealer's Hand"} deckId={deckId}/>
      <Hand title={"Your Hand"} deckId={deckId}/>
    </>
  );
}

export default App;
