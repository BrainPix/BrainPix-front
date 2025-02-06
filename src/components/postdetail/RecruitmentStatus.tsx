import styles from './recruitmentStatus.module.scss';

const RecruitmentStatus = () => {
  const members = [
    { id: '1', name: 'yeonyny', role: '디자이너', portfolio: '#' },
    { id: '2', name: 'yeonyny', role: '디자이너', portfolio: '#' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>프로젝트 개최 인원</h1>
        <div className={styles.divider}></div>
      </div>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <span className={styles.column}>아이디</span>
          <span className={styles.column}>역할</span>
          <span className={styles.column}>프로필</span>
        </div>
        {members.map((member) => (
          <div
            key={member.id}
            className={styles.recruitmentRow}>
            <div className={styles.cell}>{member.name}</div>
            <div className={styles.cell}>{member.role}</div>
            <div className={styles.cell}>
              <a
                href={member.portfolio}
                className={styles.portfolioLink}>
                바로가기
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecruitmentStatus;
