import PaymentTitle from '../../components/payment/PaymentTitle';
import SellerInfo from '../../components/payment/SellerInfo';
import PaymentMethods from '../../components/payment/PaymentMethods';
import PaymentSummary from '../../components/payment/PaymentSummary';
import PaymentButton from '../../components/payment/PaymentButton';
import styles from './ideaMarketPayment.module.scss';

const IdeaMarketPayment = () => {
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
