import styles from './postRecord.module.scss';

interface Record {
  id: string;
  paymentMethod: string;
  amount: number;
}

interface PostRecordProps {
  records: Record[];
}

function PostRecord({ records }: PostRecordProps) {
  return (
    <div className={styles.recordWrapper}>
      <h2>구매 현황</h2>
      {records.map((record) => (
        <div
          key={record.id}
          className={styles.recordRow}>
          <div className={styles.recordDetail}>{record.id}</div>
          <div className={styles.recordDetail}>{record.paymentMethod}</div>
          <div className={styles.recordDetail}>
            {record.amount.toLocaleString()} 원
          </div>
          <div className={styles.recordDetail}>
            <button className={styles.messageButton}>수락</button>
            <button className={styles.messageButton}>거절</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostRecord;
