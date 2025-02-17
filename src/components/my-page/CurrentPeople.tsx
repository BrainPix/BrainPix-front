import styles from './applyStatus.module.scss';

interface CurrentPeopleProps {
  currentMembers: {
    role: string;
    approvedCount: number;
    memberId: {
      id: string;
      userType: string;
      acceptedMemberId?: number;
    }[];
  }[];
}

// export const CurrentPeople = ({ currentMembers }: CurrentPeopleProps) => {
//   // const CURRENT_MEMBERS = [
//   //   {
//   //     id: 'serqe',
//   //     role: '디자이너',
//   //     current: 1,
//   //   },
//   // ];
//   {
//     console.log('해당 요청 과제의 현재 인원 : ', currentMembers);
//   }
  return (
    <div className={styles.container}>
      <div className={styles.tableTitle}>현재 인원</div>
      <div className={styles.titleDivider} />
      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <span>아이디</span>
          <span className={styles.divider} />
          <span>역할</span>
          <span className={styles.divider} />
          <span>인원수</span>
          <span className={styles.divider} />
          <span />
        </div>
        {currentMembers?.map((member) =>
          member.memberId?.map((user) => (
            <div
              key={user.id}
              className={styles.tableRow}>
              <span>{user.id}</span>
              <span className={styles.divider} />
              <span>{member.role}</span>
              <span className={styles.divider} />
              <span>{member.approvedCount}</span>
              <span className={styles.divider} />
              <div className={styles.buttonGroup}>
                <button className={styles.button}>프로필</button>
                <button className={styles.button}>메신저</button>
              </div>
            </div>
          )),
        )}
      </div>
    </div>
  );
};
