import styles from './paymentTitle.module.scss';

const PaymentTitle = () => {
  return (
    <div className={styles.paymentTitle}>
      <div className={styles.title}>결제하기</div>
      <div className={styles.content}>
        <div className={styles.image}></div>
        <div className={styles.text}>
          <div className={styles.price}>2,000,000원</div>
          <div className={styles.description}>디자인 해드립니다</div>
        </div>
      </div>
    </div>
  );
};

export default PaymentTitle;
