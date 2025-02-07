import styles from './applyTable.module.scss';

interface ApplyTableProps {
  id: string,
  role: string,
  current: number,
  total: number,
}

export const ApplyTable = ({ id, role, current, total } : ApplyTableProps) => {

  return (
    <div className={styles.tableRow}>
      <span>{id}</span>
      <span className={styles.divider} />
      <span>{role}</span>
      <span className={styles.divider} />
      <span>{current} / {total}</span>
      <span className={styles.divider} />
      <div className={styles.buttonGroup}>
        <button className={styles.profileButton}>프로필</button>
        <button className={styles.messageButton}>메신저</button>
      </div>
    </div>
  );
};