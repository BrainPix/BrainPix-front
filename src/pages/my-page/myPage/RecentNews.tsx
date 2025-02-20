import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './recentNews.module.scss';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { PreviewList } from '../../../components/my-page/myPage/PreviewList';
import Arrow from '../../../assets/icons/arrowRight.svg?react';
import Loading from '../../../assets/icons/loading.svg?react';
import {
  deleteAllAlarms,
  getAlarms,
  getTrashAlarm,
} from '../../../apis/alarmAPI';
import { getAlarmResponseType } from '../../../types/alarmType';
import React from 'react';
import { useIntersectionObserverAPI } from '../../../hooks/useIntersectionObserverAPI';
import { ToastContext } from '../../../contexts/toastContext';
import LoadingPage from '../../loading/LoadingPage';

export const RecentNews = () => {
  const queryClient = useQueryClient();
  const { errorToast } = useContext(ToastContext);

  const [lastCardId, setLastCardId] = useState(0);
  const [isOpenMoreDelete, setIsOpenMoreDelete] = useState<boolean>(false);
  const [currentPageNums, setCurrentPageNums] = useState<number[]>([
    1, 2, 3, 4, 5,
  ]);
  const [clickedPage, setClickedPage] = useState<number>(1);

  const { setTarget } = useIntersectionObserverAPI({
    onIntersect: (observer) => {
      if (observer.isIntersecting) {
        fetchNextPage();
        const totalCurrentCardLength = alarmsInTrash?.pages.reduce(
          (acc, page) => acc + page.data.alarmDetailList.length,
          0,
        );
        setLastCardId(totalCurrentCardLength - 1);
      }
    },
  });

  const { data: alarms, isFetching: isFetchingAlarms } = useQuery({
    queryKey: ['alarms', clickedPage],
    queryFn: () => getAlarms(clickedPage),
  });

  const { mutate: deleteAllMutate } = useMutation({
    mutationFn: deleteAllAlarms,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['alarmsInTrash'],
      });
    },
    onError: () => errorToast('삭제에 실패하였습니다.'),
  });

  const {
    data: alarmsInTrash,
    isFetching: isFetchingTrashAlarms,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['alarmsInTrash'],
    queryFn: ({ pageParam = 0 }) => getTrashAlarm(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.currentPage < pages[0].data.totalPages) {
        return lastPage?.currentPage + 1;
      }
    },
  });

  useEffect(() => {
    if (alarms?.totalPage < 5) {
      const pages = new Array(alarms.data.totalPage)
        .fill(0)
        .map((_, idx) => idx + 1);
      setCurrentPageNums(pages);
    }
  }, [alarms]);

  if (isFetchingAlarms) {
    return <LoadingPage />;
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

  const handleClickIcon = () => {
    queryClient.invalidateQueries({
      queryKey: ['alarms', clickedPage],
    });
  };

  return (
    <div className={classNames(styles.container)}>
      <div>
        <h1 className={classNames(styles.title)}>최근 소식</h1>
        <div className={classNames(styles.listContainer)}>
          {alarms?.alarmDetailList?.map((alarmData: getAlarmResponseType) => (
            <PreviewList
              iconType='trash'
              key={alarmData.alarmId}
              alarmData={alarmData}
              onClickIcon={handleClickIcon}
            />
          ))}
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
              currentPageNums[currentPageNums.length - 1] >= alarms.totalPage
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
        <div className={classNames(styles.title)}>
          휴지통{' '}
          <button onClick={() => deleteAllMutate()}>휴지통 비우기</button>
        </div>
        {alarmsInTrash?.pages[0].data.alarmDetailList.length === 0 ? (
          <h1 className={classNames(styles.noAlarmText)}>
            휴지통이 비었습니다.
          </h1>
        ) : (
          <button
            onClick={handleClickMoreIcon}
            className={classNames(styles.moreButton, 'buttonOutlined-grey500')}>
            더보기
            <Arrow
              width={24}
              height={24}
              stroke='#BDBDBD'
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
                  (alarmData: getAlarmResponseType, idx: number) => (
                    <PreviewList
                      key={alarmData.alarmId}
                      ref={5 * pageIdx + idx === lastCardId ? setTarget : null}
                      iconType='delete'
                      alarmData={alarmData}
                      onClickIcon={handleClickIcon}
                    />
                  ),
                )}
              </React.Fragment>
            ))}
            {isFetchingTrashAlarms && (
              <div className={classNames(styles.loadingWrapper)}>
                <Loading />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
