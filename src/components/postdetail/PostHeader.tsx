import { useState } from 'react';
import styles from './postHeader.module.scss';
import ArrowIcon from '../../assets/icons/arrowUp2Thin.svg?react';
import DotIcon from '../../assets/icons/dot.svg?react';
import BookmarkIcon from '../../assets/icons/bookmarkFill.svg?react';
import EmptyCircleIcon from '../../assets/icons/emptyCircle.svg?react';
import { DeadlineLabel } from '../common/label/DeadlineLabel';
import Label from '../common/label/Label';

import { getCategoryLabel } from '../../constants/categoryMapper';

interface PostHeaderProps {
  category: string;
  auth: string;
  title: string;
  deadline: number;
  viewCount: number;
  saveCount: number;
  createdDate: string;
}

const PostHeader = ({
  category,
  auth,
  title,
  deadline,
  viewCount,
  saveCount,
  createdDate,
}: PostHeaderProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [currentSaveCount, setCurrentSaveCount] = useState(saveCount);

  const toggleBookmark = () => {
    setIsBookmarked((prev) => !prev);
    setCurrentSaveCount((prev) => (isBookmarked ? prev - 1 : prev + 1));
  };

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <span className={styles.text}>협업광장</span>
        <ArrowIcon className={styles.arrowIcon} />
        <span className={styles.text}>{getCategoryLabel(category)}</span>
      </div>
      <div className={styles.firstContainer}>
        <DeadlineLabel deadline={deadline} />
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>{title}</h1>
          {auth === 'COMPANY' && (
            <Label
              text='기업 공개'
              type='corporatePublic'
            />
          )}
          {auth === 'ALL' && (
            <Label
              text='전체 공개'
              type='entire'
            />
          )}
        </div>
      </div>
      <div className={styles.details}>
        <span className={styles.date}>{createdDate}</span>
        <DotIcon className={styles.dotIcon} />
        <span className={styles.info}>조회 {viewCount}</span>
        <DotIcon className={styles.dotIcon} />
        <span className={styles.info}>저장 {currentSaveCount}</span>
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
