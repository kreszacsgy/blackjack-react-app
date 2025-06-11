import styles from './Hand.module.css';

const Hand = ({title,cards,score,isRevealed = true }) => {

    const renderCards = (cards) => {
        if (!cards) {return null;}

        return cards.map((card, index) => {
            if (title === "Dealer's Hand" && index === 0) {
                return (
                    <div key={`flip-${card.code}`} className={`${styles.flipCard} ${isRevealed ? styles.revealed : ''}`}>
                        <div className={styles.flipCardInner}>
                            <div className={styles.flipCardFront}>
                                <img src="https://deckofcardsapi.com/static/img/back.png" alt="Hidden card" />
                            </div>
                            <div className={styles.flipCardBack}>
                                <img src={card.image} alt={card.code} />
                            </div>
                        </div>
                    </div>
                    );             
            }
            return <img src={card.image} alt={card.code} key={card.code} className={styles.card} style={{ animationDelay: `${index * 0.1}s` }} />;
        });
    };
 

    return (
        <div className={styles.handContainer}>
             {cards.length > 0 && <h1 className={styles.title}>{title} ({score})</h1>}
            <div className={styles.cardContainer}>{renderCards(cards)}</div>        
        </div>
    );
}

export default Hand;