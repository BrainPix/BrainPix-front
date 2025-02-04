import styles from './recruitmentInfo.module.scss';

const RecruitmentInfo = () => {
  const RECRUITMENT_UNITS = [
    { id: '1', role: '디자이너', current: 1, total: 4 },
    { id: '2', role: '디자이너', current: 1, total: 4 },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>모집 정보</h1>
        <div className={styles.divider}></div>
      </div>

      <div className={styles.tableHeader}>
        <span className={styles.column}>모집 단위</span>
        <span className={styles.column}>모집 인원</span>
      </div>

      <div className={styles.recruitmentTable}>
        {RECRUITMENT_UNITS.map((unit) => (
          <div
            key={unit.id}
            className={styles.recruitmentRow}>
            <span className={styles.role}>{unit.role}</span>
            <span className={styles.count}>
              {unit.current} / {unit.total}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecruitmentInfo;
