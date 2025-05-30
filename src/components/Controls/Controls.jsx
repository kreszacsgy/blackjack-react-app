import styles from './Controls.module.css';

const Controls=({ onHit, onStand, onReset,buttonState })=>{
    return (
        <div className={styles.controlsContainer}>
          <button   className={styles.button} onClick={onHit} disabled={buttonState.hitDisabled} >Hit</button>
          <button   className={styles.button} onClick={onStand} disabled={buttonState.standDisabled}>Stand</button>
          <button   className={styles.button} onClick={onReset} disabled={buttonState.resetDisabled}>Reset</button>
        </div>
      );
}

export default Controls;