// import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Fragment } from 'react/jsx-runtime';
import styles from './myPage.module.scss';
import { useQuery } from '@tanstack/react-query';

import { getMyBasicInfo } from '../../../apis/mypageAPI';
import { MyProfileCard } from '../../../components/my-page/myPage/MyProfileCard';
import { PreviewList } from '../../../components/my-page/myPage/PreviewList';
import { MyBaseInfoType } from '../../../types/myPageType';
import { CATEGORY_LABELS } from '../../../constants/categoryMapper';
import { getAlarms } from '../../../apis/alarmAPI';
import { getAlarmResponseType } from '../../../types/alarmType';

const INIT_DATA = {
  name: '',
  userType: '',
  specializations: [],
  ideaCount: 0,
  collaborationCount: 0,
  selfIntroduction: '',
};

export const MyPage = () => {
  const { data: myBaseInfoData } = useQuery({
    queryKey: ['myBasicInfo'],
    queryFn: getMyBasicInfo,
  });

  const { data: alarms, isFetching: isFetchingAlarms } = useQuery({
    queryKey: ['alarms'],
    queryFn: () => getAlarms(0),
  });

  if (isFetchingAlarms) {
    return <div>로딩중,,</div>;
  }

  // const previewAlarms = alarms?.slice(0, 4);

  // console.log(alarms.data.alarmDetailList);

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
            .map(
              ({
                alarmId,
                isRead,
                header,
                message,
                redirectUrl,
              }: getAlarmResponseType) => (
                <PreviewList
                  key={alarmId}
                  isRead={isRead}
                  header={header}
                  message={message}
                  redirectUrl={redirectUrl}
                />
              ),
            )}
        </div>
      </div>
      <div>
        <div className={classNames(styles.title)}>
          내 아이디어
          <a href='/my'>전체보기</a>
        </div>
        <div className={classNames(styles.recentNewsWrapper)}>
          <PreviewList />
        </div>
      </div>
    </div>
  );
};
