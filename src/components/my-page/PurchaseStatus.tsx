import styles from './purchaseStatus.module.scss';

export const PurchaseStatus = () => {
  const PURCHASE_RECORDS = [
    { id: 'serqe', payment: '카카오페이', price: 1000 },
    { id: 'serqe', payment: '카카오페이', price: 1000 },
  ];

  return (
    <>
      <div className={styles.tableHeader}>
        <span>아이디</span>
        <span className={styles.divider} />
        <span>거래 방식</span>
        <span className={styles.divider} />
        <span>지불 금액</span>
        <span className={styles.divider} />
        <span>메신저</span>
      </div>
      {PURCHASE_RECORDS.map((record) => (
        <div className={styles.tableRow}>
          <span>{record.id}</span>
          <span className={styles.divider} />
          <span>{record.payment}</span>
          <span className={styles.divider} />
          <span>{record.price}</span>
          <span className={styles.divider} />
          <div className={styles.buttonGroup}>
            <button className={styles.button}>보내기</button>
          </div>
      </div>
      ))}
    </>
  );
};
