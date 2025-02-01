import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';

import Individual from '../../assets/icons/individualMember.svg?react';
import Corporate from '../../assets/icons/corporateMember.svg?react';

import styles from './signUp.module.scss';

export const Signup = () => {
  const navigate = useNavigate();
  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(styles.logo)}>로고</div>
      <h1 className={classNames(styles.headline)}>
        로그인하고
        <br /> 아이디어를 공유해보세요!
      </h1>
      <div className={classNames(styles.buttonWrapper)}>
        <button
          onClick={() => navigate('individual')}
          className={classNames(styles.memberButton, 'buttonFilled-grey800')}>
          <Individual stroke='#fafafa' />
          <span>개인회원 로그인하기</span>
        </button>
        <button
          onClick={() => navigate('corporate')}
          className={classNames(styles.memberButton, 'buttonOutlined-grey500')}>
          <Corporate />
          <span>기업회원 로그인하기</span>
        </button>
      </div>
      <p className={classNames(styles.signUpText)}>
        아직 회원이 아니라면? <strong>회원가입하기</strong>
      </p>
    </div>
  );
};
