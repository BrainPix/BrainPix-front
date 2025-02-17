import styles from './recruitmentStatus.module.scss';

interface RecruitmentStatusProps {
  members: {
    userId: number;
    name: string;
    domain: string;
    openMyProfile: boolean;
  }[];
}

const RecruitmentStatus = ({ members }: RecruitmentStatusProps) => {
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
        {members.length === 0 ? (
          <p className={styles.noMembers}>현재 공개된 프로필이 없습니다.</p>
        ) : (
          members.map((member) => (
            <div
              key={member.userId}
              className={styles.recruitmentRow}>
              <div className={styles.cell}>{member.name}</div>
              <div className={styles.cell}>{member.domain}</div>
              <div className={styles.cell}>
                {(member.openMyProfile ?? false) ? (
                  <a
                    href={`/profile/${member.userId}`}
                    className={styles.portfolioLink}>
                    바로가기
                  </a>
                ) : (
                  <span className={styles.privateProfile}>비공개</span>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RecruitmentStatus;
