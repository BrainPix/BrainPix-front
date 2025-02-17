import styles from './profileHeader.module.scss';
import { useNavigate } from 'react-router-dom';
import { imageErrorHandler } from '../../utils/imageErrorHandler';

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
    navigate(`/personal-profile/${writerId}/${profileType}`); //userid로 변경 필요
  };
  return (
    <div className={styles.container}>
      <div className={styles.profileContainer}>
        <img
          src={profileImageUrl || '/default-profile.png'}
          alt={`${name}의 프로필 이미지`}
          className={styles.profileIcon}
          onError={imageErrorHandler}
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
