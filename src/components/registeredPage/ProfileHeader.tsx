import styles from './profileHeader.module.scss';

interface ProfileHeaderProps {
  name: string;
  profileImageUrl: string;
  openMyProfile: () => void; // 프로필 페이지로 이동하는 함수
}

const ProfileHeader = ({
  name,
  profileImageUrl,
  openMyProfile,
}: ProfileHeaderProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <img
          src={profileImageUrl || '/default-profile.png'}
          alt='프로필 이미지'
          className={styles.profileIcon}
        />
        <span className={styles.name}>{name || '?'}</span>
      </div>
      <span
        className={styles.viewProfile}
        onClick={openMyProfile}>
        프로필 보기
      </span>
    </div>
  );
};

export default ProfileHeader;
