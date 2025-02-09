import styles from './profileHeader.module.scss';

interface ProfileHeaderProps {
  writerId: number;
  name: string;
  profileImageUrl: string;
}

const ProfileHeader = ({
  writerId,
  name,
  profileImageUrl,
}: ProfileHeaderProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <img
          src={profileImageUrl || '/default-profile.png'}
          alt={`${name}의 프로필 이미지`}
          className={styles.profileIcon}
        />
        <div className={styles.textContainer}>
          <span className={styles.name}>{name || '사용자'}</span>
        </div>
      </div>
      <button
        className={styles.viewProfile}
        onClick={() => console.log(`유저 ${writerId} 프로필 페이지로 이동`)}>
        프로필 보기
      </button>
      <div className={styles.divider} />
    </div>
  );
};

export default ProfileHeader;
