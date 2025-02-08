import styles from './deadlineLabel.module.scss';

export const DeadlineLabel = ({ deadline }: { deadline: number }) => {
  return (
    <div className={styles.label}>
      <div className={styles.text}>모집 마감 D-{deadline}</div>
    </div>
  );
};
