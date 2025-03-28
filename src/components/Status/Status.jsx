
import React from 'react';
import styles from './Status.css';



const Status= (props) => {
    const {message,balance}=props;
  return (
    <div className={styles.statusContainer}>
      <div className={styles.status}>
        <h1 className={styles.value}>{message}</h1>
      </div>
      <div className={styles.balance}>
        <h1 className={styles.value}>${balance}</h1>
      </div>
    </div>
  );
}

export default Status;