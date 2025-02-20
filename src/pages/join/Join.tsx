import { useNavigate } from 'react-router-dom';
import styles from './join.module.scss';
import FailIcon from '../../assets/icons/failIcon.svg?react';
import classNames from 'classnames';

export const Join = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <FailIcon />
      </div>
      <h1 className={styles.title}>안녕하세요, 회원님!</h1>
      <p className={styles.description}>
        BrainPIX의 기업 회원만 볼 수 있는 페이지 입니다.
      </p>
      <p className={classNames(styles.joinText)}>지금 바로 가입하기</p>
      <div className={styles.buttonWrapper}>
        <button
          onClick={() => navigate('/login/personal')}
          className={styles.primaryButton}>
          <span>개인 회원</span>
        </button>
        <button
          onClick={() => navigate('/login/corporate')}
          className={styles.secondaryButton}>
          <span>기업 회원</span>
        </button>
      </div>
    </div>
  );
};
