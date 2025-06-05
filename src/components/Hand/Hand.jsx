
import styles from './Hand.module.css';

const Hand = ({title,cards,score,isRevealed = true }) => {

    const renderCards = (cards) => {
        if (!cards) {return null;}

        return cards.map((card, index) => {
            if (title === "Dealer's Hand" && !isRevealed && index === 0) {
                return <img src="https://deckofcardsapi.com/static/img/back.png" alt="Hidden card" key="hidden" />;
            }
            return <img src={card.image} alt={card.code} key={card.code} />;
        });
    };
 

    return (
        <div className={styles.handContainer}>
             {cards.length > 0 && <h1 className={styles.title}>{title} - {score} points</h1>}
            <div className={styles.cardContainer}>{renderCards(cards)}</div>        
        </div>
    );
}

export default Hand;