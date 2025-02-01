import Label from '../common/label/Label';
import styles from './profileHeader.module.scss';

const ProfileHeader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <div className={styles.profileIcon}></div>
        <div className={styles.textContainer}>
          <Label
            text='자체 공모'
            type='selfOffer'
          />
          <span className={styles.name}>Soyeon</span>
        </div>
      </div>
      <span className={styles.viewProfile}>프로필 보기</span>
      <div className={styles.divider} />
    </div>
  );
};

export default ProfileHeader;
