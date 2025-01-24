import React from 'react';
import styles from './previewThumbnail.module.scss';
import Bookmark from '../../assets/icons/bookmark.svg?react';
import Profile from '../../assets/icons/profile.svg?react';

interface PreviewThumbnailProps {
  imageUrl?: string;
  profileImage?: string;
  username?: string;
  description?: string;
  price?: number;
  isBookmarked?: boolean;
  onBookmarkClick?: () => void;
  verified?: boolean;
}

const PreviewThumbnail: React.FC<PreviewThumbnailProps> = ({
  imageUrl = '',
  profileImage = '',
  username = '',
  description = '',
  price = 0,
  isBookmarked = false,
  onBookmarkClick = () => {},
  verified = false,
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.profileSection}>
        <div className={styles.profileImage}>
          {profileImage ? (
            <img
              src={profileImage} // 나중에 API 나오면 profile.svg 지우고 여기에 api 넣으면 됩니다.
              alt={username} // yeonyny 부분에 해당합니다.
            />
          ) : (
            <Profile className={styles.defaultProfileIcon} />
          )}
        </div>
        <div className={styles.userInfo}>
          {verified && <span className={styles.verifiedBadge}>기업 공개</span>}
          <span>{username}</span>
        </div>
      </div>

      <div className={styles.thumbnailImage}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={description}
          />
        ) : (
          <img
            src='/api/placeholder/312/372'
            alt='썸네일 API 받아오는 공간'
          />
        )}
      </div>

      <div className={styles.contentSection}>
        <p>{description}</p>
        <div className={styles.priceSection}>
          <span>{price?.toLocaleString() ?? 0}원</span>
          <button onClick={onBookmarkClick}>
            <Bookmark
              className={`${styles.bookmarkIcon} ${isBookmarked ? styles.bookmarked : ''}`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewThumbnail;
