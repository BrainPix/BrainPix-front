import { useState } from 'react';
import styles from '../postdetail/postHeader.module.scss';
import { DeadlineLabel } from '../common/label/DeadlineLabel';
import ArrowIcon from '../../assets/icons/arrowUp2Thin.svg?react';
import DotIcon from '../../assets/icons/dot.svg?react';
import BookmarkIcon from '../../assets/icons/bookmarkFill.svg?react';
import EmptyCircleIcon from '../../assets/icons/emptyCircle.svg?react';

interface PostHeaderProps {
  tab: string;
  category: string;
  title: string;
  date: string;
  deadline: number;
  viewCount: number;
  saveCount: number;
  //webLink: string | null;
}

export const CollaboPostHeader = ({
  tab,
  category,
  title,
  date,
  deadline,
  viewCount,
  saveCount,
}: PostHeaderProps) => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <span className={styles.text}>{tab}</span>
        <ArrowIcon className={styles.arrowIcon} />
        <span className={styles.text}>{category}</span>
      </div>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>{title}</h1>
        <DeadlineLabel deadline={deadline} />
      </div>
      <div className={styles.details}>
        <span className={styles.date}>{date}</span>
        <DotIcon className={styles.dotIcon} />
        <span className={styles.info}>조회 {viewCount}</span>
        <DotIcon className={styles.dotIcon} />
        <span className={styles.info}>저장 {saveCount}</span>
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
