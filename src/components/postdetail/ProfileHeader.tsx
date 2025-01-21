import SelfOfferLabel from '../common/label/SelfOfferLabel';
import styles from './profileHeader.module.scss';

const ProfileHeader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <div className={styles.profileIcon}></div>
        <div className={styles.textContainer}>
          <SelfOfferLabel />
          <span className={styles.name}>Soyeon</span>
        </div>
      </div>
      <span className={styles.viewProfile}>프로필 보기</span>
      <div className={styles.divider} />
    </div>
  );
};

export default ProfileHeader;
