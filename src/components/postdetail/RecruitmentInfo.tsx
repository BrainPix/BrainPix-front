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
      {/*map을 사용하여 recruitmentUnits 배열을 순회하며 각 요소를 출력*/}
      {RECRUITMENT_UNITS.map((unit) => (
        <div
          key={unit.id}
          className={styles.recruitmentRow}>
          <div className={styles.leftBox}>
            <span className={styles.role}>{unit.role}</span>
          </div>
          <div className={styles.rightBox}>
            <span className={styles.count}>
              <span>{unit.current}</span>
              <span className={styles.separator}> / </span>
              <span>{unit.total}</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecruitmentInfo;
