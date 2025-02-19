import styles from './applyStatus.module.scss';

interface PurchaseStatusProps {
  purchaseHistory: {
    buyerID: string;
    userId: number;
    payment: string;
    totalPay: number;
  }[];
}

export const PurchaseStatus = ({ purchaseHistory }: PurchaseStatusProps) => {
  // const PURCHASE_RECORDS = [
  //   { id: 'drerwr', payment: '카카오페이', price: 1000 },
  //   { id: 'drerwr', payment: '카카오페이', price: 1000 },
  // ];

  if (!purchaseHistory || !Array.isArray(purchaseHistory)) {
    return <div>구매 내역이 없습니다.</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.tableTitle}>구매 현황</div>
      <div className={styles.titleDivider} />
      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <span>아이디</span>
          <span className={styles.divider} />
          <span>거래 방식</span>
          <span className={styles.divider} />
          <span>지불 금액</span>
          <span className={styles.divider} />
          <span>메신저</span>
        </div>
        {purchaseHistory.map((record) => (
          <div
            key={record.userId}
            className={styles.tableRow}>
            <span>{record.buyerID}</span>
            <span className={styles.divider} />
            <span>{record.payment}</span>
            <span className={styles.divider} />
            <span>{record.totalPay.toLocaleString()}</span>
            <span className={styles.divider} />
            <div className={styles.buttonGroup}>
              <button className={styles.button}>보내기</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
