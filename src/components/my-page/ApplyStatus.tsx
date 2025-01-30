import styles from './applyStatus.module.scss';

export const ApplyStatus = () => {
  const APPLY_RECORDS = [
    { id: 'serqe', role: '디자이너', current: 1, total: 4 },
  ];

  return (
    <>
      <div className={styles.title}>지원 현황</div>
      <div className={styles.divider}></div>
      <div className={styles.cardHeader}>
        <span>아이디</span>
        <span>역할</span>
        <span>현재 인원 / 모집 인원</span>
      </div>
      {APPLY_RECORDS.map((record) => (
        <div
          key={record.id}
          className={styles.purchaseCard}>
          <div className={styles.cardDetails}>
            <div>{record.id}</div>
            <div>{record.role}</div>
            <div>
              {record.current} / {record.total}
            </div>
            <span className={styles.cardActions}>
              <button className={styles.messageButton}>수락</button>
              <button className={styles.messageButton}>거절</button>
            </span>
          </div>
        </div>
      ))}
    </>
  );
};
