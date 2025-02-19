import React from 'react';
import { useQuery } from '@tanstack/react-query';
import classNames from 'classnames';
import styles from './myInfoCard.module.scss';

import { getMyBasicInfo } from '../../../apis/mypageAPI';
import { CATEGORY_LABELS } from '../../../constants/categoryMapper';
import Label from '../label/Label';
import { Image } from '../image/Image';
import { MY_BASIC_INFO_INIT } from '../../../constants/initValues';

interface MyInfoCardPropsType {
  token: string | null;
  onClickLogout: () => void;
}

export const MyInfoCard = ({ token, onClickLogout }: MyInfoCardPropsType) => {
  const { data: myBasicInfo, isFetching: isFetchingMyInfo } = useQuery({
    queryKey: ['myBasicInfo'],
    queryFn: getMyBasicInfo,
    enabled: !!token,
  });

  const {
    profileImage,
    userType,
    ideaCount,
    collaborationCount,
    specializations,
    nickname,
  } = myBasicInfo?.data ?? MY_BASIC_INFO_INIT;

  return (
    <div className={classNames(styles.container)}>
      {isFetchingMyInfo ? (
        <React.Fragment>
          <div
            className={classNames(styles.infoWrapper, styles.skeletonWrapper)}>
            <div
              className={classNames(styles.profileImage, styles.skeletonImage)}
            />
            <div className={classNames(styles.userNameWrapper)}>
              <div className={classNames(styles.skeletonXs)} />
              <div className={classNames(styles.skeletonS)} />
            </div>
          </div>
          <div className={classNames(styles.skeletonContent)} />
          <div className={classNames(styles.skeletonS)} />
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className={classNames(styles.infoWrapper)}>
            <Image
              alt='프로필 이미지'
              className={classNames(styles.profileImage)}
              src={profileImage}
            />
            <div className={classNames(styles.userNameWrapper)}>
              <Label
                text={userType === 'INDIVIDUAL' ? '개인' : '기업'}
                type={userType === 'INDIVIDUAL' ? 'personal' : 'corporate'}
              />
              <p className={classNames(styles.userName)}>{nickname}</p>
            </div>
            <a
              href='/my'
              className={classNames(styles.myPageButton)}>
              MY
            </a>
          </div>
          <div className={classNames(styles.postCountContainer)}>
            <div className={classNames(styles.labelWrapper)}>
              <p
                className={classNames(
                  styles.speciallizations,
                  styles.content,
                  styles.label,
                )}>
                분야
              </p>
              <p className={classNames(styles.content, styles.label)}>
                아이디어
              </p>
              <p className={classNames(styles.content, styles.label)}>
                협업 경험
              </p>
            </div>
            <div className={classNames(styles.contentWrapper)}>
              <p
                className={classNames(styles.speciallizations, styles.content)}>
                {CATEGORY_LABELS[specializations[0]]}
              </p>
              <p className={classNames(styles.content)}>{ideaCount}</p>
              <p className={classNames(styles.content)}>{collaborationCount}</p>
            </div>
          </div>
          <button
            onClick={onClickLogout}
            className={classNames(styles.logoutButton)}>
            로그아웃
          </button>
        </React.Fragment>
      )}
    </div>
  );
};
