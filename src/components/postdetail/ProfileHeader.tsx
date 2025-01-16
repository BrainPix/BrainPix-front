import styles from './profileHeader.module.scss';
import profileIcon from '../../assets/icons/profile.svg';

const ProfileHeader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <img
          src={profileIcon}
          alt='Profile Icon'
          className={styles.profileIcon}
        />
        <div className={styles.textContainer}>
          <div className={styles.label}>자체공모</div>
          <span className={styles.name}>Soyeon</span>
        </div>
      </div>
      <span className={styles.viewProfile}>프로필 보기</span>
      <div className={styles.divider} />
    </div>
  );
};

export default ProfileHeader;
