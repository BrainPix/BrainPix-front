//import { useNavigate } from 'react-router-dom';
import styles from './applyTable.module.scss';

interface ApplyTableProps {
  id: string;
  userType: string;
  role: string;
  current: number;
  total: number;
}

export const ApplyTable = ({
  id,
  //userType,
  role,
  current,
  total,
}: ApplyTableProps) => {
  // const navigate = useNavigate();
  // const handleProfile = (userId: number, userType: string) => {
  //   navigate(`/personal-profile/${userId}/${userType}`);
  // };

  return (
    <div className={styles.tableRow}>
      <span>{id}</span>
      <span className={styles.divider} />
      <span>{role}</span>
      <span className={styles.divider} />
      <span>
        {current} / {total}
      </span>
      <span className={styles.divider} />
      <div className={styles.buttonGroup}>
        <button className={styles.profileButton}>프로필</button>
        <button className={styles.messageButton}>메신저</button>
      </div>
    </div>
  );
};
