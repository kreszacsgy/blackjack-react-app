import styles from './Controls.module.css';

const Controls=({ onHit, onStand, onReset })=>{
    return (
        <div className={styles.controlsContainer}>
          <button   className={styles.button} onClick={onHit}>Hit</button>
          <button   className={styles.button} onClick={onStand}>Stand</button>
          <button   className={styles.button} onClick={onReset}>Reset</button>
        </div>
      );
}

export default Controls;