import styles from './personalLabel.module.scss';

const PersonalLabel = () => {
  return (
    <div className={styles.label}>
      <div className={styles.text}>개인</div>
    </div>
  );
};

export default PersonalLabel;
