import styles from './card.module.scss';
import UnclickBookmark from '../../../assets/icons/unclickBookmark.svg?react';
import Bookmark from '../../../assets/icons/bookmark.svg?react';

interface CardProps {
  id: number;
  isBookmarked?: boolean;
  saves: number;
  views: number;
  onBookmarkClick: (cardId: number) => void;
}

const Card = ({
  id,
  isBookmarked,
  saves,
  views,
  onBookmarkClick,
}: CardProps) => {
  return (
    <div className={styles.carouselCard}>
      <div className={styles.cardImage}>
        <div className={styles.letter}>C</div>
        <div className={styles.tags}>
          <span className={styles.tag}>전체 공개</span>
          <span className={styles.tag}>광고 · 홍보</span>
        </div>
        <div className={styles.cardTitle}>브랜드 로고 만들어드립니다</div>
      </div>
      <div className={styles.cardInfo}>
        <div className={styles.cardHeader}>
          <div className={styles.userInfo}>
            <span className={styles.userName}>SEO YEON</span>
          </div>
          <div
            className={styles.bookmark}
            onClick={() => onBookmarkClick(id)}
            role='button'
            tabIndex={0}>
            {isBookmarked ? <Bookmark /> : <UnclickBookmark />}
          </div>
        </div>
        <div className={styles.cardFooter}>
          <div className={styles.price}>200,000 원</div>
          <div className={styles.cardStats}>
            <span>
              저장 {saves} · 조회 {views}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
