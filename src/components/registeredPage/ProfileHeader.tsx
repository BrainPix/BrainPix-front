import styles from './profileHeader.module.scss';
import { imageErrorHandler } from '../../utils/imageErrorHandler';
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
        <img
          src={profileImageUrl}
          alt='프로필 이미지'
          className={styles.profileIcon}
          onError={imageErrorHandler}
        />
        <span className={styles.name}>{name || '사용자'}</span>
      </div>
      <button
        className={styles.viewProfile}
        onClick={handleProfileClick}>
        프로필 보기
      </button>
    </div>
  );
};

export default ProfileHeader;
