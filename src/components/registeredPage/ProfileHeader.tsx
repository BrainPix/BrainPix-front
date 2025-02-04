import styles from './profileHeader.module.scss';

const ProfileHeader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <div className={styles.profileIcon}></div>
        <span className={styles.name}>SEO YEON</span>
      </div>
      <span className={styles.viewProfile}>프로필 보기</span>
    </div>
  );
};

export default ProfileHeader;
