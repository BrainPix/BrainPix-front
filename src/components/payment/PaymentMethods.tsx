import React from 'react';
import styles from './PaymentMethods.module.scss';

const PaymentMethods: React.FC = () => {
  return (
    <div className={styles.paymentMethods}>
      <div className={styles.title}>결제 수단</div>
      <div className={styles.buttonContainer}>
        <button className={styles.button}>카카오페이</button>
        <button className={styles.button}>휴대폰 결제</button>
        <button className={styles.button}>계좌이체</button>
      </div>
    </div>
  );
};

export default PaymentMethods;
