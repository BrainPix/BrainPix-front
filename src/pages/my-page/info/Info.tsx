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
      </div>
    </div>
  );
};
