import { useState } from 'react';
import styles from './postHeader.module.scss';
import ArrowIcon from '../../assets/icons/arrowUp2Thin.svg?react';
import DotIcon from '../../assets/icons/dot.svg?react';
import BookmarkIcon from '../../assets/icons/bookmarkFill.svg?react';
import EmptyCircleIcon from '../../assets/icons/emptyCircle.svg?react';
import { DeadlineLabel } from '../common/label/DeadlineLabel';
import Label from '../common/label/Label';
const PostHeader = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <span className={styles.text}>협업광장</span>
        <ArrowIcon className={styles.arrowIcon} />
        <span className={styles.text}>디자인</span>
      </div>
      <DeadlineLabel deadline={5} />
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>저랑 프로젝트 같이 하실 분</h1>
        <Label
          text='기업 공개'
          type='corporatePublic'
        />
      </div>
      <div className={styles.details}>
        <span className={styles.date}>2024/12/28</span>
        <DotIcon className={styles.dotIcon} />
        <span className={styles.info}>조회 120</span>
        <DotIcon className={styles.dotIcon} />
        <span className={styles.info}>저장 12</span>
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
    </div>
  );
};

export default PostHeader;
