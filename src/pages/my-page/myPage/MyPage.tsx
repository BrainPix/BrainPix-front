import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Fragment } from 'react/jsx-runtime';
import styles from './myPage.module.scss';
import { useQuery } from '@tanstack/react-query';

import { getMyBasicInfo } from '../../../apis/mypageAPI';
import { MyProfileCard } from '../../../components/my-page/myPage/MyProfileCard';
import { PreviewList } from '../../../components/my-page/myPage/PreviewList';
import { MyBaseInfoType } from '../../../types/myPageType';
import { getAlarms } from '../../../apis/alarmAPI';
import { getCategoryLabel } from '../../../utils/categoryMapping';

const INIT_DATA = {
  name: '',
  userType: '',
  specializations: [],
  ideaCount: 0,
  collaborationCount: 0,
  selfIntroduction: '',
};

export const MyPage = () => {
  const [specializationString, setSpecializationString] = useState('');
  const { data: myBaseInfoData } = useQuery({
    queryKey: ['myBasicInfo'],
    queryFn: getMyBasicInfo,
  });

  useEffect(() => {
    if (specializationString === '') {
      specializations.map((specialization) => {
        setSpecializationString(
          (prev) => prev + getCategoryLabel(specialization),
        );
      });
    }

    console.log(specializationString);
  }, [myBaseInfoData, specializationString]);

  const { data: alarms } = useQuery({
    queryKey: ['alarms'],
    queryFn: getAlarms,
  });

  const myBaseInfo: MyBaseInfoType = myBaseInfoData?.data ?? INIT_DATA;

  const { ideaCount, specializations, collaborationCount, selfIntroduction } =
    myBaseInfo;

  const SUB_INFO = {
    분야: specializations.length === 0 ? '없음' : specializationString,
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
          <PreviewList isRead />
          <PreviewList />
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
