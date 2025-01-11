import classNames from 'classnames';

import Individual from '../../assets/icons/individualMember.svg?react';
import Corporate from '../../assets/icons/corporateMember.svg?react';

import styles from './signUp.module.scss';

export const Signup = () => {
  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(styles.logo)}>로고</div>
      <h1 className={classNames(styles.headline)}>
        회원가입하고
        <br /> 아이디어를 공유해보세요!
      </h1>
      <div className={classNames(styles.buttonWrapper)}>
        <button className={classNames(styles.memberButton, styles.individual)}>
          <Individual />
          <span>개인회원</span>
        </button>
        <button className={classNames(styles.memberButton)}>
          <Corporate />
          <span>기업회원</span>
        </button>
      </div>
    </div>
  );
};
