import React, { useEffect, useState } from 'react';
import styles from './Hand.css';




const Hand = ({title,deckId}) => {
    const [cards ,setCards]=useState([]);

    
    const [score, setScore] = useState(0);
  
  

    
    const drawCard=(event)=>{
        event.preventDefault();
        fetch (`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
            .then((response) => response.json())
            .then((data) => {setCards(data.cards)}
        )
        
    }

    useEffect(() => {
       
        if (cards.length > 0) {
            console.log("Pontszám számítása elindult...");
            const newScore = calculate(cards);
            console.log("Új pontszám:", newScore);
            setScore(newScore);

        }
    }, [cards]);

    const calculate = (cards) => {
        
        console.log("Számolás előtt cards:", cards);
        let total = 0;
        let aceCount = 0;
        cards.forEach((card) => {
            console.log("Aktuális kártya:", card.value);
          if (card.value === 'KING' || card.value === 'QUEEN' || card.value === 'JACK') {
            total+=10
          }else if (card.value === "ACE") {
            aceCount++;} 
          else{
            total += parseInt(card.value);
          }
        });

       
        
        if (aceCount>0){
            for(var i=0; i<aceCount; ++i){
                if (total+11>21){
                    total +=1;
                } else if ((total + 11) === 21) {
                    if (aceCount > 1) {
                      total += 1;
                    }else {
                        total += 11;
                    }}
                else {
                    total+=11;
                }
            }

        }
        
        console.log("Kiszámolt pontszám:", total);
        return total;
      }
    
   


    const renderCards=()=>{
        return cards.map(card=><img src={card.image} alt={card.code} key={card.code}/>)
    }
   
  

    return (
        <div className={styles.handContainer}>
             {cards.length > 0 && <h1 className={styles.title}>{title} - {score} point</h1>}
            <div className={styles.cardContainer}>{renderCards()}</div>
            <button onClick={drawCard}>Draw</button>
        
        </div>
    );
}

export default Hand;