import { useState } from 'react';
import classNames from 'classnames';
import styles from './recentNews.module.scss';
import { useQuery } from '@tanstack/react-query';

import { PreviewList } from '../../../components/my-page/myPage/PreviewList';
import Arrow from '../../../assets/icons/arrowRight.svg?react';
import { getAlarms } from '../../../apis/alarmAPI';
import { getAlarmResponseType } from '../../../types/alarmType';

export const RecentNews = () => {
  const [isOpenMoreDelete, setIsOpenMoreDelete] = useState<boolean>(false);
  const [currentPageNums, setCurrentPageNums] = useState<number[]>([
    1, 2, 3, 4, 5,
  ]);
  const [clickedPage, setClickedPage] = useState<number>(1);

  const { data: alarms, isFetching: isFetchingAlarms } = useQuery({
    queryKey: ['alarms', clickedPage],
    queryFn: () => getAlarms(clickedPage),
  });

  if (isFetchingAlarms) {
    return <div>로딩중,,</div>;
  }

  const handleClickPreviousArrow = () => {
    const updatedPageNums = currentPageNums.map((page: number) => page - 5);
    setCurrentPageNums(updatedPageNums);
  };

  const handleClickNextArrow = () => {
    const updatedPageNums = currentPageNums.map((page: number) => page + 5);
    setCurrentPageNums(updatedPageNums);
  };

  const handleClickPageNum = (page: number) => {
    setClickedPage(page);
  };

  const handleClickMoreIcon = () => {
    setIsOpenMoreDelete((prev) => !prev);
  };

  return (
    <div className={classNames(styles.container)}>
      <div>
        <h1 className={classNames(styles.title)}>최근 소식</h1>
        <div className={classNames(styles.listContainer)}>
          {alarms?.data.alarmDetailList.map(
            (alarmData: getAlarmResponseType) => (
              <PreviewList
                iconType='trash'
                key={alarmData.alarmId}
                alarmData={alarmData}
              />
            ),
          )}
        </div>
        <div className={classNames(styles.pageNumberWrapper)}>
          <button
            disabled={currentPageNums[0] <= 1}
            onClick={handleClickPreviousArrow}
            className={classNames(styles.arrowButton)}>
            <Arrow
              width={20}
              height={20}
              stroke='#757575'
              className={classNames(styles.leftArrow)}
            />
          </button>
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
          <button
            className={classNames(styles.arrowButton)}
            onClick={handleClickNextArrow}
            disabled={currentPageNums[4] >= alarms.data.totalPage}>
            <Arrow
              width={20}
              height={20}
              stroke='#757575'
            />
          </button>
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
