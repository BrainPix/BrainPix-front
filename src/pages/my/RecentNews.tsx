import { useState } from 'react';
import classNames from 'classnames';
import styles from './recentNews.module.scss';
import { PreviewList } from '../../components/my/PreviewList';
import Arrow from '../../assets/icons/arrowRight.svg?react';

export const RecentNews = () => {
  const [isOpenMoreDelete, setIsOpenMoreDelete] = useState<boolean>(false);

  const [currentPageNums, setCurrentPageNums] = useState<number[]>([
    1, 2, 3, 4, 5,
  ]);

  const [clickedPage, setClickedPage] = useState<number>(1);

  const handleClickPageNum = (page: number) => {
    setClickedPage(page);
    if (page !== 1 && page === currentPageNums[0]) {
      return setCurrentPageNums([page - 3, page - 2, page - 1, page, page + 1]);
    }
    if (page === currentPageNums[currentPageNums.length - 1]) {
      return setCurrentPageNums([page - 1, page, page + 1, page + 2, page + 3]);
    }
  };

  const handleClickMoreIcon = () => {
    setIsOpenMoreDelete((prev) => !prev);
  };

  return (
    <div className={classNames(styles.container)}>
      <div>
        <h1 className={classNames(styles.title)}>최근 소식</h1>
        <PreviewList iconType='trash' />
        <div className={classNames(styles.pageNumberWrapper)}>
          {currentPageNums.map((currentPageNum) => (
            <span
              key={currentPageNum}
              className={classNames(
                clickedPage === currentPageNum
                  ? styles.clicked
                  : styles.nonClicked,
              )}
              onClick={() => handleClickPageNum(currentPageNum)}>
              {currentPageNum}
            </span>
          ))}
        </div>
      </div>
      <div>
        <h1 className={classNames(styles.title)}>휴지통</h1>
        <button
          onClick={handleClickMoreIcon}
          className={classNames(styles.moreButton, 'buttonFilled-grey700')}>
          더보기
          <Arrow
            width={24}
            height={24}
            stroke='#fafafa'
            className={classNames(
              isOpenMoreDelete ? styles.upArrow : styles.bottomArrow,
            )}
          />
        </button>
        {isOpenMoreDelete && (
          <div className={classNames(styles.trashListWrapper)}>
            <PreviewList iconType='delete' />
            <PreviewList iconType='delete' />
            <PreviewList iconType='delete' />
            <PreviewList iconType='delete' />
          </div>
        )}
      </div>
    </div>
  );
};
