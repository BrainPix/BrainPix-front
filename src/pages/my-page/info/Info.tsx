import classNames from 'classnames';
import styles from './info.module.scss';

import { MyProfileCard } from '../../../components/my/MyProfileCard';

export const Info = () => {
  return (
    <div>
      <MyProfileCard status='edit' />
      <div className={classNames(styles.contentContainer)}>
        <div>
          <h1 className={classNames(styles.title)}>자기 소개</h1>
          <div className={classNames(styles.introduceWrapper)}>
            자기 소개 내용임
          </div>
        </div>
        <div>
          <h1 className={classNames(styles.title)}>개별 정보</h1>
          <div className={classNames(styles.individualInfoWrapper)}>
            <div className={classNames(styles.labelWrapper)}>
              <span>연락처</span>
              <span>노션</span>
              <span>깃허브</span>
            </div>
            <div className={classNames(styles.contentWrapper)}>
              <span>01023451234</span>
              <span>노션 주소</span>
              <span>깃허브 주소</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
