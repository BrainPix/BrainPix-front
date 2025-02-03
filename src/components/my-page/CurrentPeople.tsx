import styles from './currentPeople.module.scss';

export const CurrentPeople = () => {
  const CURRENT_MEMBERS = [
    {
      id: 'serqe',
      role: '디자이너',
      current: 1,
    },
  ];
  return (
    <>
      <div className={styles.title}>현재 인원</div>
      <div className={styles.divider}></div>
      <div className={styles.cardHeader}>
        <span>아이디</span>
        <span>역할</span>
        <span>인원수</span>
      </div>
      {CURRENT_MEMBERS.map((record) => (
        <div
          key={record.id}
          className={styles.purchaseCard}>
          <div className={styles.cardDetails}>
            <div>{record.id}</div>
            <div>{record.role}</div>
            <div>{record.current}</div>
            <span className={styles.cardActions}>
              <button className={styles.messageButton}>프로필</button>
              <button className={styles.messageButton}>메신저</button>
            </span>
          </div>
        </div>
      ))}
    </>
  );
};
