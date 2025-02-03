import styles from './purchaseStatus.module.scss';

export const PurchaseStatus = () => {
  const PURCHASE_RECORDS = [
    { id: 'serqe', paymentMethod: '카카오페이', amount: 1000 },
    { id: 'serqe', paymentMethod: '카카오페이', amount: 1000 },
  ];

  return (
    <>
      <div className={styles.title}>구매 현황</div>
      <div className={styles.divider}></div>
      <div className={styles.cardHeader}>
        <span>아이디</span>
        <span>거래 방식</span>
        <span>지불 금액</span>
      </div>
      {PURCHASE_RECORDS.map((record) => (
        <div
          key={record.id}
          className={styles.purchaseCard}>
          <div className={styles.cardDetails}>
            <div>{record.id}</div>
            <div>{record.paymentMethod}</div>
            <div>{record.amount}</div>
            <span className={styles.cardActions}>
              <button className={styles.messageButton}>메신저 보내기</button>
            </span>
          </div>
        </div>
      ))}
    </>
  );
};
