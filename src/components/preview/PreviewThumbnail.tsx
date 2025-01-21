import React from 'react';
import styles from './previewThumbnail.module.scss';
import Bookmark from '../../assets/icons/bookmark.svg?react';

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
          <img
            src={profileImage || '/api/placeholder/24/24'}
            alt={username}
          />
        </div>
        <span>{username}</span>
        {verified && <span className={styles.verifiedBadge}>인증됨</span>}
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
            alt='placeholder'
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
