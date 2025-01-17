import styles from './recruitmentStatus.module.scss';

const RecruitmentStatus = () => {
  const members = [
    { id: 'yeonyny', role: '디자이너', portfolio: '#' },
    { id: 'yeonyny', role: '디자이너', portfolio: '#' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>모집 현황</h1>
        <div className={styles.divider}></div>
      </div>
      <div className={styles.tableHeader}>
        <span className={styles.column}>아이디</span>
        <span className={styles.column}>역할</span>
        <span className={styles.column}>포트폴리오</span>
      </div>
      {/*map을 사용하여 members 배열을 순회하며 각 요소를 출력*/}
      {members.map((member, index) => (
        <div
          key={index}
          className={styles.recruitmentRow}>
          <div className={styles.cell}>{member.id}</div>
          <div className={styles.cell}>{member.role}</div>
          <div className={styles.cell}>
            <a
              href={member.portfolio}
              className={styles.button}>
              바로가기
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecruitmentStatus;
