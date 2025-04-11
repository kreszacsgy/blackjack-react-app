import React, { useEffect, useState } from 'react';
import styles from './Hand.module.css';




const Hand = ({title,deckId,onScoreUpdate}) => {
    const [cards ,setCards]=useState([]);

    
    const [score, setScore] = useState(0);
  
  

    
    const drawCard=(event)=>{
        event.preventDefault();
        const count = cards.length === 0 ? 2 : 1;
       
            fetch (`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=${count}`)
                .then((response) => response.json())
                .then((data) => {setCards(prevCards => [...prevCards, ...data.cards])}
            );
    }
        
    

    useEffect(() => {
       
        if (cards.length > 0) {
            const newScore = calculate(cards);
            setScore(newScore);
            onScoreUpdate(newScore);
        }
    }, [cards,onScoreUpdate]);

    const calculate = (cards) => {
        
        let total = 0;
        let aceCount = 0;
        cards.forEach((card) => {
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