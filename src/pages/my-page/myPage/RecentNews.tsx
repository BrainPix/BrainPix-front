import { useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './recentNews.module.scss';
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { PreviewList } from '../../../components/my-page/myPage/PreviewList';
import Arrow from '../../../assets/icons/arrowRight.svg?react';
import { getAlarms, getTrashAlarm } from '../../../apis/alarmAPI';
import { getAlarmResponseType } from '../../../types/alarmType';
import React from 'react';

export const RecentNews = () => {
  const queryClient = useQueryClient();

  const [isOpenMoreDelete, setIsOpenMoreDelete] = useState<boolean>(false);
  const [currentPageNums, setCurrentPageNums] = useState<number[]>([
    1, 2, 3, 4, 5,
  ]);
  const [clickedPage, setClickedPage] = useState<number>(1);

  const { data: alarms, isFetching: isFetchingAlarms } = useQuery({
    queryKey: ['alarms', clickedPage],
    queryFn: () => getAlarms(clickedPage),
  });

  const { data: alarmsInTrash, isFetching: isFetchingTrashAlarms } =
    useInfiniteQuery({
      queryKey: ['alarmsInTrash'],
      queryFn: ({ pageParam = 0 }) => getTrashAlarm(pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.currentPage < pages[0].totalPages) {
          return lastPage?.currentPage + 1;
        }
      },
    });

  useEffect(() => {
    if (alarms?.data.totalPage < 5) {
      const pages = new Array(alarms.data.totalPage)
        .fill(0)
        .map((_, idx) => idx + 1);
      console.log(pages);
      setCurrentPageNums(pages);
    }
  }, [alarms]);

  if (isFetchingAlarms || isFetchingTrashAlarms) {
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

  const handleClickTrashIcon = () => {
    queryClient.invalidateQueries({
      queryKey: ['alarms', clickedPage],
    });
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
            disabled={
              currentPageNums[currentPageNums.length - 1] >=
              alarms.data.totalPage
            }>
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
        {alarmsInTrash?.pages[0].data.alarmDetailList.length === 0 ? (
          <h1 className={classNames(styles.noAlarmText)}>
            휴지통이 비었습니다.
          </h1>
        ) : (
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
        )}
        {isOpenMoreDelete && (
          <div className={classNames(styles.trashListWrapper)}>
            {alarmsInTrash?.pages.map((alarms, pageIdx) => (
              <React.Fragment key={pageIdx}>
                {alarms.data.alarmDetailList.map(
                  (alarmData: getAlarmResponseType) => (
                    <PreviewList
                      key={alarmData.alarmId}
                      iconType='delete'
                      alarmData={alarmData}
                      onClickIcon={handleClickTrashIcon}
                    />
                  ),
                )}
              </React.Fragment>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
