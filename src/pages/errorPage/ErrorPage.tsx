import PageErrorIcon from '../../assets/icons/pageError.svg?react';
import styles from './errorPage.module.scss';
import { useNavigate } from 'react-router-dom';

export const ErrorPage = () => {
  const navigate = useNavigate();

  const goBackTwice = () => {
    window.history.go(-1);
  };

  return (
    <div className={styles.container}>
      <PageErrorIcon />

      <h2 className={styles.title}>페이지를 찾을 수 없어요</h2>
      <p className={styles.subtitle}>브레인 픽스를 다시 시도 해주세요.</p>
      <div className={styles.buttonGroup}>
        <button
          className={styles.replayButton}
          onClick={goBackTwice}>
          이전 페이지
        </button>
        <button
          className={styles.mainButton}
          onClick={() => navigate('/idea-market')}>
          메인 페이지
        </button>
      </div>
    </div>
  );
};
