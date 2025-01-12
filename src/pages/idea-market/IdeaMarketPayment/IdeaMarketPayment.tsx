import React from 'react';
import PaymentTitle from '../../../components/payment/PaymentTitle';
import SellerInfo from '../../../components/info/SellerInfo';
import PaymentMethods from '../../../components/payment/PaymentMethods';
import PaymentSummary from '../../../components/payment/PaymentSummary';
import PaymentButton from '../../../components/button/PaymentButton';
import styles from './IdeaMarketPayment.module.scss';

const IdeaMarketPayment: React.FC = () => {
  return (
    <>
      <div className={styles.ideaMarketPayment}>
        <PaymentTitle />
      </div>
      <div className={styles.ideaMarketPaymentLayout}>
        <SellerInfo />
        <PaymentMethods />
        <PaymentSummary />
        <PaymentButton
          isPaymentReady={true}
          onPaymentClick={() => {}}
        />
      </div>
    </>
  );
};

export default IdeaMarketPayment;
