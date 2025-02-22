import { Image } from '../common/image/Image';
import styles from './profileHeader.module.scss';
import { useNavigate } from 'react-router-dom';

interface ProfileHeaderProps {
  writerId: number;
  name: string;
  profileImageUrl: string;
  role: string;
}

const ProfileHeader = ({
  writerId,
  name,
  profileImageUrl,
  role,
}: ProfileHeaderProps) => {
  const navigate = useNavigate();

  const handleProfileClick = () => {
    const profileType = role === 'CORPORATE' ? 'corporate' : 'personal';
    navigate(`/personal-profile/${writerId}/${profileType}`);
  };
  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <Image
          src={profileImageUrl}
          alt={`${name}의 프로필 이미지`}
          className={styles.profileIcon}
        />
        <div className={styles.textContainer}>
          <span className={styles.name}>{name || '사용자'}</span>
        </div>
      </div>
      <button
        className={styles.viewProfile}
        onClick={handleProfileClick}>
        프로필 보기
      </button>
      <div className={styles.divider} />
    </div>
  );
};

export default ProfileHeader;
