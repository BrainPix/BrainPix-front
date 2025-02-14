import React, { useState } from 'react';
import classNames from 'classnames';
import { Fragment } from 'react/jsx-runtime';
import styles from './myPage.module.scss';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

import { getMyBasicInfo } from '../../../apis/mypageAPI';
import { MyProfileCard } from '../../../components/my-page/myPage/MyProfileCard';
import { PreviewList } from '../../../components/my-page/myPage/PreviewList';
import { MyBaseInfoType } from '../../../types/myPageType';
import { CATEGORY_LABELS } from '../../../constants/categoryMapper';
import { getAlarms } from '../../../apis/alarmAPI';
import { getAlarmResponseType } from '../../../types/alarmType';
import { getMyIdeas } from '../../../apis/ideaMarketAPI';
import { useIntersectionObserverAPI } from '../../../hooks/useIntersectionObserverAPI';
import { GetMyIdeasResponse } from '../../../types/ideaMarket';
import Loading from '../../../assets/icons/loading.svg?react';

const INIT_DATA = {
  name: '',
  userType: '',
  specializations: [],
  ideaCount: 0,
  collaborationCount: 0,
  selfIntroduction: '',
};

export const MyPage = () => {
  const [lastCardId, setLastCardId] = useState(0);

  const { setTarget } = useIntersectionObserverAPI({
    onIntersect: (observer) => {
      if (observer.isIntersecting) {
        fetchNextPage();
        const totalCurrentCardLength = myIdeas?.pages.reduce(
          (acc, page) => acc + page.data.content.length,
          0,
        );

        setLastCardId(totalCurrentCardLength - 1);
      }
    },
  });

  const { data: myBaseInfoData } = useQuery({
    queryKey: ['myBasicInfo'],
    queryFn: getMyBasicInfo,
  });

  const { data: alarms, isFetching: isFetchingAlarms } = useQuery({
    queryKey: ['alarms'],
    queryFn: () => getAlarms(0),
  });

  const {
    data: myIdeas,
    isFetching: isGetIdeasFetching,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['myPorfolios'],
    queryFn: ({ pageParam = 0 }) => getMyIdeas(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.data.currentPage < pages[0].data.totalPages) {
        return lastPage?.data.currentPage + 1;
      }
    },
  });

  if (isFetchingAlarms) {
    return <div>로딩중,,</div>;
  }

  const myBaseInfo: MyBaseInfoType = myBaseInfoData?.data ?? INIT_DATA;

  const { ideaCount, specializations, collaborationCount, selfIntroduction } =
    myBaseInfo;

  const SUB_INFO = {
    분야:
      specializations.length === 0
        ? '없음'
        : CATEGORY_LABELS[specializations[0]],
    아이디어: ideaCount,
    '협업 경험': collaborationCount,
  };

  return (
    <div>
      <MyProfileCard userData={myBaseInfo} />
      <div className={classNames(styles.subInfoWrapper)}>
        {Object.entries(SUB_INFO).map(([key, value]) => (
          <Fragment key={key}>
            <div>
              <p className={classNames(styles.subTitle)}>{key}</p>
              <p className={classNames(styles.content)}>{value}</p>
            </div>
          </Fragment>
        ))}
      </div>
      <div className={classNames(styles.contentContainer)}>
        <div className={classNames(styles.title)}>자기소개</div>
        <p className={classNames(styles.introduceContent)}>
          {selfIntroduction}
        </p>
      </div>
      <div className={classNames(styles.contentContainer)}>
        <div className={classNames(styles.title)}>
          최근 소식
          <a href='/my/recent-news'>자세히</a>
        </div>
        <div className={classNames(styles.recentNewsWrapper)}>
          {alarms.data.alarmDetailList
            .slice(0, 3)
            .map((alarmData: getAlarmResponseType) => (
              <PreviewList
                key={alarmData.alarmId}
                alarmData={alarmData}
              />
            ))}
        </div>
      </div>
      <div>
        <div className={classNames(styles.title)}>내 아이디어</div>
        <div className={classNames(styles.recentNewsWrapper)}>
          {myIdeas?.pages.map((ideas, pageIdx) => (
            <React.Fragment key={pageIdx}>
              {ideas.data.content.map(
                ({ ideaId, title }: GetMyIdeasResponse, idx: number) => (
                  <PreviewList
                    key={ideaId}
                    ref={3 * pageIdx + idx === lastCardId ? setTarget : null}
                    iconType='idea'
                    alarmData={{
                      alarmId: String(ideaId),
                      header: title,
                      isRead: false,
                      message: '아이디어 마켓',
                      redirectUrl: `/idea-market/registered/${ideaId}`,
                    }}
                  />
                ),
              )}
            </React.Fragment>
          ))}
          {isGetIdeasFetching && (
            <div className={classNames(styles.loadingIconWrapper)}>
              <Loading />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
