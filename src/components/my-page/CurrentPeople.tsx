import styles from './applyStatus.module.scss';

export const CurrentPeople = () => {
  const CURRENT_MEMBERS = [
    {
      id: 'serqe',
      role: '디자이너',
      current: 1,
    },
  ];
  return (
    <div className={styles.container}>
      <div className={styles.tableTitle}>현재 인원</div>
      <div className={styles.titleDivider}/>
      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <span>아이디</span>
          <span className={styles.divider} />
          <span>역할</span>
          <span className={styles.divider} />
          <span>인원수</span>
          <span className={styles.divider} />
          <span/>
        </div>
        {CURRENT_MEMBERS.map((member) => (
          <div className={styles.tableRow}>
            <span>{member.id}</span>
            <span className={styles.divider} />
            <span>{member.role}</span>
            <span className={styles.divider} />
            <span>{member.current}</span>
            <span className={styles.divider} />
            <div className={styles.buttonGroup}>
              <button className={styles.button}>프로필</button>
              <button className={styles.button}>메신저</button>
            </div>
        </div>
        ))}
      </div>
    </div>
  );
};
