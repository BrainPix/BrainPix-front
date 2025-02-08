import styles from './ideaMarketRegisterComplete.module.scss';
import FinishIcon from '../../assets/icons/finishIcon.svg?react';
import { useNavigate } from 'react-router-dom';

export const IdeaMarketRegisterComplete = () => {
  const navigate = useNavigate();

  const handleRegisteredClick = () => {
    navigate('/idea-market/registered');
  };

  const handleMyPageClick = () => {
    navigate('/my');
  };

  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <FinishIcon />
      </div>
      <h1 className={styles.title}>아이디어 등록 완료!</h1>
      <p className={styles.description}>
        아이디어가 <span className={styles.highlight}>브레인픽스</span>에
        등록되었어요.
      </p>
      <div className={styles.buttonWrapper}>
        <button
          onClick={handleRegisteredClick}
          className={styles.primaryButton}>
          <span>등록글 보기</span>
        </button>
        <button
          onClick={handleMyPageClick}
          className={styles.secondaryButton}>
          <span>마이페이지</span>
        </button>
      </div>
    </div>
  );
};
