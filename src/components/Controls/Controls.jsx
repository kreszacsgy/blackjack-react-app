import React, { useState, useEffect } from 'react';
import styles from './Controls.module.css';

const Controls=({ onHit, onStand, onReset,buttonState,balance, betEvent,gameState })=>{
  const [amount, setAmount] = useState(10);
  const [inputStyle, setInputStyle] = useState(styles.input);

  useEffect(() => {
    validation();
  }, [amount, balance]);

  const validation = () => {
    if (amount > balance) {
      setInputStyle(styles.inputError);
      return false;
    }
    if (amount < 0.01) {
      setInputStyle(styles.inputError);
      return false;
    }
    setInputStyle(styles.input);
    return true;
  }

  const amountChange = (e) => {
    setAmount(e.target.value);
  }

  const onBetClick = () => {
    if (validation()) {
      betEvent(Math.round(amount * 100) / 100);
    }
  }

  const getControls=()=>{
    if(gameState==="bet" ){ 
      return(<div className={styles.controlsContainer}>
          <div className={styles.betContainer}>
            <h4>Amount:</h4>
            <input autoFocus type="number" step="0.01"  min="0.01" max={balance} value={amount} onChange={amountChange} className={inputStyle} />
          </div>
          <button onClick={() => onBetClick() } disabled={amount > balance || amount < 0.01} className={styles.button}>Bet</button>
        </div>)

    }else{return (
      <div className={styles.controlsContainer}>
          <button   className={styles.button} onClick={onHit} disabled={buttonState.hitDisabled} >Hit</button>
          <button   className={styles.button} onClick={onStand} disabled={buttonState.standDisabled}>Stand</button>
          <button   className={styles.button} onClick={onReset} disabled={buttonState.resetDisabled}>Reset</button>
        </div>
    )

    }
  }
  
    return (
        <>{getControls()}</>
    );
}

export default Controls;