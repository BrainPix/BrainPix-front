import { useState } from 'react';
import styles from './postTitle.module.scss';
import ArrowIcon from '../../assets/icons/arrowUp2Thin.svg?react';
import DotIcon from '../../assets/icons/dot.svg?react';
import BookmarkIcon from '../../assets/icons/bookmarkFill.svg?react';
import EmptyCircleIcon from '../../assets/icons/emptyCircle.svg?react';
import Label from '../common/label/Label';

const PostTitlePay = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className={styles.container}>
      <div className={styles.leftSection}>
        <div className={styles.placeholderBox}>대표사진</div>
      </div>
      <div className={styles.rightSection}>
        <div className={styles.navigation}>
          <span className={styles.text}>아이디어 마켓</span>
          <ArrowIcon className={styles.arrowIcon} />
          <span className={styles.text}>디자인</span>
        </div>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>디자인 해드립니다</h1>
          <Label
            text='기업 공개'
            type='corporatePublic'
          />
          <button
            className={styles.bookmarkButton}
            onClick={toggleBookmark}>
            <EmptyCircleIcon
              className={styles.outerCircle}
              style={{
                stroke: isBookmarked ? '#377FF8' : '#BDBDBD',
              }}
            />
            <BookmarkIcon
              className={styles.bookmarkIcon}
              fill={isBookmarked ? '#377FF8' : '#BDBDBD'}
            />
          </button>
        </div>
        <div className={styles.price}>2,000,000원</div>
        <div className={styles.details}>
          <span className={styles.date}>2024/12/28</span>
          <DotIcon className={styles.dotIcon} />
          <span className={styles.info}>조회 120</span>
          <DotIcon className={styles.dotIcon} />
          <span className={styles.info}>저장 12</span>
        </div>
      </div>
      <button className={styles.purchaseButton}>구매하기</button>
    </div>
  );
};

export default PostTitlePay;
