
import styles from './Hand.module.css';

const Hand = ({title,cards,score}) => {
    
    const renderCards=(cards)=>{
        if (!cards) {
            return null; 
        }
        return cards.map(card=><img src={card.image} alt={card.code} key={card.code}/>)
    };
  

    return (
        <div className={styles.handContainer}>
             {cards.length > 0 && <h1 className={styles.title}>{title} - {score} point</h1>}
            <div className={styles.cardContainer}>{renderCards(cards)}</div>        
        </div>
    );
}

export default Hand;