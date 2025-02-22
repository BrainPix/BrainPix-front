import { useEffect } from 'react';
import classNames from 'classnames';
import { useNavigate } from 'react-router-dom';
import styles from './main.module.scss';

import Individual from '../../assets/icons/individualMember.svg?react';
import Corporate from '../../assets/icons/corporateMember.svg?react';
import Logo from '../../assets/icons/logo.svg?react';

export const Main = () => {
  const navigate = useNavigate();
  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (accessToken) {
      navigate('/idea-market', { replace: true });
    }
  }, [navigate, accessToken]);

  return (
    <div className={classNames(styles.container)}>
      <Logo className={classNames(styles.logo)} />
      <h1 className={classNames(styles.headline)}>
        로그인하고
        <br /> 아이디어를 공유해보세요!
      </h1>
      <div className={classNames(styles.buttonWrapper)}>
        <button
          onClick={() => navigate('/login/personal')}
          className={classNames(styles.memberButton, 'buttonFilled-grey900')}>
          <Individual stroke='#fafafa' />
          <span>개인회원 로그인하기</span>
        </button>
        <button
          onClick={() => navigate('/login/corporate')}
          className={classNames(styles.memberButton, 'buttonOutlined-grey600')}>
          <Corporate />
          <span>기업회원 로그인하기</span>
        </button>
      </div>
      <p className={classNames(styles.signUpText)}>
        아직 회원이 아니라면? <a href='/sign-up'>회원가입하기</a>
      </p>
    </div>
  );
};
