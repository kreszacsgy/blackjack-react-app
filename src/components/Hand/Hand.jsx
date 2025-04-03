import React, { useState } from 'react';
import styles from './Hand.css';




const Hand = ({title,deckId}) => {
    const [cards ,setCards]=useState([]);

    const drawCard=(event)=>{
        event.preventDefault();
        fetch (`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
            .then((response) => response.json())
            .then((data) => {setCards(data.cards)}
        )
    }

    const renderCards=()=>{
        return cards.map(card=><img src={card.image} alt={card.code} key={card.code}/>)
    }
   
    const getTitle = () => {
        if (cards.length > 0) {
            return (
            <h1 className={styles.title}>{title}</h1>
            );
        }
    }

    return (
        <div className={styles.handContainer}>
            {getTitle()}
            <div className={styles.cardContainer}>{renderCards()}</div>
            <button onClick={drawCard}>Draw</button>
        
        </div>
    );
}

export default Hand;