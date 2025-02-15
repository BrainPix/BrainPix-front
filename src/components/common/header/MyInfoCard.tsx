import classNames from 'classnames';
import styles from './myInfoCard.module.scss';

import { imageErrorHandler } from '../../../utils/imageErrorHandler';
import Label from '../label/Label';
import { MyBaseInfoType } from '../../../types/myPageType';
import { CATEGORY_LABELS } from '../../../constants/categoryMapper';

interface MyInfoCardPropsType {
  userData: MyBaseInfoType;
  onClickLogout: () => void;
}

export const MyInfoCard = ({
  userData,
  onClickLogout,
}: MyInfoCardPropsType) => {
  const {
    profileImage,
    userType,
    ideaCount,
    collaborationCount,
    specializations,
    name,
  } = userData;

  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(styles.infoWrapper)}>
        <img
          alt='프로필 이미지'
          onError={imageErrorHandler}
          className={classNames(styles.profileImage)}
          src={profileImage}
        />
        <div className={classNames(styles.userNameWrapper)}>
          <Label
            text={userType === 'INDIVIDUAL' ? '개인' : '기업'}
            type={userType === 'INDIVIDUAL' ? 'personal' : 'corporate'}
          />
          <p className={classNames(styles.userName)}>{name}</p>
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
          <p className={classNames(styles.content, styles.label)}>아이디어</p>
          <p className={classNames(styles.content, styles.label)}>협업 경험</p>
        </div>
        <div className={classNames(styles.contentWrapper)}>
          <p className={classNames(styles.speciallizations, styles.content)}>
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
    </div>
  );
};
