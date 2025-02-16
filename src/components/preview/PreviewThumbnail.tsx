import React from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import Bookmark from '../../assets/icons/bookmark.svg?react';
import UnclickBookmark from '../../assets/icons/unclickBookmark.svg?react';
import DefaultImage from '../../assets/icons/defaultImage.svg?react';
import styles from './previewThumbnail.module.scss';

interface PreviewThumbnailProps {
  ideaId: number;
  imageUrl?: string;
  profileImage?: string;
  username?: string;
  description?: string;
  price?: number;
  isBookmarked?: boolean;
  auth?: 'ALL' | 'COMPANY' | 'ME';
  category?: string;
  saves?: number;
  views?: number;
  size?: 'normal' | 'large';
  onBookmarkClick?: () => void;
}

const categoryMap: Record<string, string> = {
  ADVERTISING_PROMOTION: '광고 · 홍보',
  DESIGN: '디자인',
  LESSON: '레슨',
  MARKETING: '마케팅',
  DOCUMENT_WRITING: '문서 · 글쓰기',
  MEDIA_CONTENT: '미디어 · 콘텐츠',
  TRANSLATION_INTERPRETATION: '번역 및 통역',
  TAX_LAW_LABOR: '세무 · 법무 · 노무',
  CUSTOM_PRODUCTION: '주문제작',
  STARTUP_BUSINESS: '창업 · 사업',
  FOOD_BEVERAGE: '푸드 및 음료',
  IT_TECH: 'IT · 테크',
  OTHERS: '기타',
};

const PreviewThumbnail: React.FC<PreviewThumbnailProps> = ({
  ideaId,
  imageUrl = '',
  profileImage = '',
  username = '',
  description = '',
  price = 0,
  isBookmarked = false,
  auth = 'ALL',
  category = '',
  saves = 0,
  views = 0,
  size = 'normal',
  onBookmarkClick = () => {},
}) => {
  const navigate = useNavigate();

  // 공개 여부 변환
  const authText =
    auth === 'ALL' ? '전체 공개' : auth === 'COMPANY' ? '기업 공개' : '비공개';
  const authClass =
    auth === 'ALL'
      ? styles.public
      : auth === 'COMPANY'
        ? styles.company
        : styles.private;

  // 카테고리 변환 (영어 → 한글)
  const categoryText = categoryMap[category] || category;

  // 이미지 클릭 핸들러
  const handleImageClick = () => {
    if (ideaId) {
      navigate(`/idea-market/registered/${ideaId}`);
    } else {
      console.error('❌ 오류: ideaId가 없습니다.');
    }
  };

  return (
    <div
      className={classNames(styles.container, {
        [styles.containerLarge]: size === 'large',
      })}>
      {/* 🔹 이미지 영역 */}
      <div
        className={styles.thumbnailImage}
        onClick={handleImageClick}
        style={{ cursor: 'pointer' }}>
        {imageUrl && imageUrl.trim() !== '' && imageUrl !== 'string' ? (
          <img
            src={imageUrl}
            alt={description}
          />
        ) : (
          <DefaultImage />
        )}
        <div className={styles.overlay}>
          <div className={styles.overlayTags}>
            <span className={classNames(styles.postAuth, authClass)}>
              {authText}
            </span>
            <span className={styles.specialization}>{categoryText}</span>
          </div>
          <span className={styles.title}>{description}</span>
        </div>
      </div>

      {/* 🔹 프로필 및 가격 정보 */}
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
          <span className={styles.username}>{username}</span>
        </div>

        <div className={styles.priceSection}>
          <span className={styles.price}>{price.toLocaleString()}원</span>
          <button
            onClick={(e) => {
              e.stopPropagation(); // 이미지 클릭 이벤트와 충돌 방지
              onBookmarkClick();
            }}
            className={styles.bookmarkButton}>
            {isBookmarked ? (
              <Bookmark className={styles.bookmarkIcon} />
            ) : (
              <UnclickBookmark className={styles.bookmarkIcon} />
            )}
          </button>
        </div>

        {/* 🔹 저장 및 조회 수 */}
        <div className={styles.stats}>
          저장 {saves} · 조회 {views}
        </div>
      </div>
    </div>
  );
};

export default PreviewThumbnail;
