import { useState, useEffect } from 'react';
import styles from './Controls.module.css';

const Controls=({ onStart,onHit, onStand, onReset,buttonState,balance, betEvent,gameState })=>{

  const [amount, setAmount] = useState(10);

   useEffect(() => {
    if (gameState === 'bet') {
      const midValue = Math.max(1, Math.round(balance / 2));
      setAmount(midValue);
    }
  }, [gameState, balance]);
  
  const amountChange = (e) => {
    setAmount(parseFloat(e.target.value));
  }

  const onBetClick = () => {    
    betEvent(Math.round(amount * 100) / 100);    
  }

  const getControls=()=>{
    if(gameState==="init" ){ 
      return (
      <div className={styles.controlsContainer}>
          <button onClick={onStart}  className={`${styles.button} ${styles.playButton}`}>Play</button>
        </div>
      )
    }else if(gameState==="bet" ){ 
      return (
      <div className={styles.controlsContainer}>
          <div className={styles.betContainer}>
            <h4> ${Math.round(amount * 100) / 100}</h4>
            <div className={styles.sliderBox}>
              <input type="range" min="1" max={balance} step="1" value={amount} onChange={amountChange} className={styles.slider} />
            </div>
          </div>
          <button onClick={() => onBetClick() } className={`${styles.button} ${styles.betButton}`}>Bet</button>
        </div>
      )
    }else{
      return (
      <div className={styles.controlsContainer}>
          <button   className={`${styles.button} ${styles.hitButton}`} onClick={onHit} disabled={buttonState.hitDisabled} >Hit</button>
          <button   className={`${styles.button} ${styles.standButton}`} onClick={onStand} disabled={buttonState.standDisabled}>Stand</button>
          <button   className={`${styles.button} ${styles.resetButton}`} onClick={onReset} disabled={buttonState.resetDisabled}>Reset</button>
      </div>
      )
    }
  }

    return (
        <>{getControls()}</>
    );
}

export default Controls;