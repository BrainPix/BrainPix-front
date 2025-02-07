import styles from './recruitInfo.module.scss';

const RecruitmentStatus = () => {
  const members = [
    {
      id: '1',
      role: '디자이너',
      recruit: '1',
      recruitfull: '5',
      pay: '100,000원 (건당)',
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>모집 정보</h1>
        <div className={styles.divider}></div>
      </div>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <span className={styles.column}>모집 단위</span>
          <span className={styles.column}>모집 인원</span>
          <span className={styles.column}>보수 금액 (형태)</span>
        </div>
        {members.map((member) => (
          <div
            key={member.id}
            className={styles.recruitmentRow}>
            <div className={styles.cell}>{member.role}</div>
            <div className={styles.cell}>
              {member.recruit} / {member.recruitfull}
            </div>
            <div className={styles.cell}> {member.pay}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecruitmentStatus;
