import React from 'react';
import classNames from 'classnames';
import Bookmark from '../../assets/icons/bookmark.svg?react';
import DefaultImage from '../../assets/icons/defaultImage.svg?react';
import styles from './previewThumbnail.module.scss';

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
    <div className={classNames(styles.container)}>
      <div className={styles.thumbnailImage}>
        {imageUrl && imageUrl.trim() !== '' && imageUrl !== 'string' ? ( // 'string' 값도 체크
          <img
            src={imageUrl}
            alt={description}
          />
        ) : (
          <DefaultImage />
        )}
        <div className={styles.overlay}>
          <span>{description}</span>
        </div>
      </div>

      <div className={styles.contentSection}>
        <div className={styles.profileSection}>
          <div className={styles.profileImage}>
            {profileImage ? (
              <img
                src={profileImage}
                alt={username}
              />
            ) : (
              <div className={styles.defaultProfile}>{username[0]}</div>
            )}
          </div>
          <div className={styles.userInfo}>
            {verified && (
              <span className={styles.verifiedBadge}>기업 공개</span>
            )}
            <span>{username}</span>
          </div>
        </div>

        <div className={styles.priceSection}>
          <span>{price?.toLocaleString() ?? 0}원</span>
          <button
            onClick={onBookmarkClick}
            className={styles.bookmarkButton}>
            <Bookmark
              className={classNames(styles.bookmarkIcon, {
                [styles.bookmarked]: isBookmarked,
              })}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewThumbnail;
