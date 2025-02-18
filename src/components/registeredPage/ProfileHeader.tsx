import styles from './profileHeader.module.scss';

interface ProfileHeaderProps {
  writerId: number;
  name: string;
  profileImageUrl: string;
}

const ProfileHeader = ({ name, profileImageUrl }: ProfileHeaderProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <img
          src={profileImageUrl || '/default-profile.png'}
          alt='프로필 이미지'
          className={styles.profileIcon}
        />
        <span className={styles.name}>{name || '사용자'}</span>
      </div>
      <button className={styles.viewProfile}>프로필 보기</button>
    </div>
  );
};

export default ProfileHeader;
