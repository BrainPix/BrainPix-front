import { useNavigate } from 'react-router-dom';
import styles from './applyStatus.module.scss';

interface CurrentPeopleProps {
  currentMembers: {
    role: string;
    approvedCount: number;
    memberId: {
      id: string;
      userType: string;
      userId: number;
    }[];
  }[];
}

export const CurrentPeople = ({ currentMembers }: CurrentPeopleProps) => {
  const navigate = useNavigate();
  const handleProfile = (userId: number, userType: string) => {
    navigate(`/personal-profile/${userId}/${userType}`);
  };

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
                <button
                  className={styles.button}
                  onClick={() => handleProfile(user.userId, user.userType)}>
                  프로필
                </button>
                <button className={styles.button}>메신저</button>
              </div>
            </div>
          )),
        )}
      </div>
    </div>
  );
};
