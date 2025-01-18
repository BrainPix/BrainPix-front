import { useState } from 'react';
import styles from './postHeader.module.scss';
import arrowIcon from '../../assets/icons/arrow-up-2-thin.svg';
import dotIcon from '../../assets/icons/dot.svg';
import bookmarkGray from '../../assets/icons/bookmark-fill-gray.svg';
import bookmarkBlue from '../../assets/icons/bookmark-fill-blue.svg';
import emptyCircleGray from '../../assets/icons/empty-gray-circle.svg';
import emptyCircleBlue from '../../assets/icons/empty-blue-circle.svg';

const PostHeader = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);

  // 북마크 버튼을 클릭했을 때 북마크 상태를 토글하는 함수
  const toggleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        <span className={styles.text}>협업광장</span>
        <img
          src={arrowIcon}
          alt='Arrow Icon'
          className={styles.arrowIcon}
        />
        <span className={styles.text}>디자인</span>
      </div>
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>저랑 프로젝트 같이 하실 분</h1>
        <div className={styles.badge}>모집 마감 (D-21)</div>
      </div>
      <div className={styles.details}>
        <span className={styles.date}>2024/12/28</span>
        <img
          src={dotIcon}
          alt='Dot Icon'
          className={styles.dotIcon}
        />
        <span className={styles.info}>조회 120</span>
        <img
          src={dotIcon}
          alt='Dot Icon'
          className={styles.dotIcon}
        />
        <span className={styles.info}>저장 12</span>
        <button
          className={styles.bookmarkButton}
          onClick={toggleBookmark}>
          <img
            src={isBookmarked ? emptyCircleBlue : emptyCircleGray}
            alt='Outer Circle'
            className={styles.outerCircle}
          />
          <img
            src={isBookmarked ? bookmarkBlue : bookmarkGray}
            alt='Bookmark Icon'
            className={styles.bookmarkIcon}
          />
        </button>
      </div>
    </div>
  );
};

export default PostHeader;
