import React from 'react';
import styles from './PaymentButton.module.scss';

interface PaymentButtonProps {
  isPaymentReady: boolean;
  onPaymentClick: () => void;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  isPaymentReady,
  onPaymentClick,
}) => {
  return (
    <button
      className={`${styles.paymentButton} ${
        isPaymentReady ? styles.active : styles.disabled
      }`}
      onClick={onPaymentClick}
      disabled={!isPaymentReady}>
      결제하기
    </button>
  );
};

export default PaymentButton;
