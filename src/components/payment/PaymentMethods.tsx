import { useState } from 'react';
import styles from './paymentMethods.module.scss';

const PaymentMethods = () => {
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);

  const handleButtonClick = (method: string) => {
    setSelectedMethod(method);
  };

  return (
    <div className={styles.paymentMethods}>
      <div className={styles.title}>결제 수단</div>
      <div className={styles.buttonContainer}>
        <button
          className={`${styles.button} ${
            selectedMethod === '카카오페이' ? styles.selected : ''
          }`}
          onClick={() => handleButtonClick('카카오페이')}>
          카카오페이
        </button>
        <button
          className={`${styles.button} ${
            selectedMethod === '휴대폰 결제' ? styles.selected : ''
          }`}
          onClick={() => handleButtonClick('휴대폰 결제')}>
          휴대폰 결제
        </button>
        <button
          className={`${styles.button} ${
            selectedMethod === '계좌이체' ? styles.selected : ''
          }`}
          onClick={() => handleButtonClick('계좌이체')}>
          계좌이체
        </button>
      </div>
    </div>
  );
};

export default PaymentMethods;
