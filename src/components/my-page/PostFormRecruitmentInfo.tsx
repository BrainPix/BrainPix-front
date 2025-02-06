import styles from './postFormRecruitmentInfo.module.scss';

export const PostFormRecruitmentInfo = () => {
  const RECRUIT_INFO = [
    {
      id: '1',
      role: '디자이너',
      current: 1,
      total: 5,
      payment: '100,000원 (건당)',
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.tableTitle}>모집 정보</div>
      <div className={styles.titleDivider}/>
      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <span>모집 단위</span>
          <span className={styles.divider} />
          <span>모집 인원</span>
          <span className={styles.divider} />
          <span>보수 금액 (형태)</span>
        </div>
        {RECRUIT_INFO.map((recruit) => (
          <div className={styles.tableRow}>
            <span>{recruit.id}</span>
            <span className={styles.divider} />
            <span>{recruit.role}</span>
            <span className={styles.divider} />
            <span>{recruit.current} / {recruit.total}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
