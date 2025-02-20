import styles from './paymentFail.module.scss';
import FailIcon from '../../assets/icons/failIcon.svg?react';
import IdeaReplayIcon from '../../assets/icons/ideaReplay.svg?react';
import { useNavigate, useLocation } from 'react-router-dom';

export const PaymentFail = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);
  const ideaId = searchParams.get('ideaId') || localStorage.getItem('ideaId');

  const handleGoBack = () => {
    if (ideaId) {
      navigate(`/idea-market/registered/${ideaId}`);
    } else {
      navigate('/idea-market');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <FailIcon />
      </div>
      <h1 className={styles.title}>결제를 실패하였습니다.</h1>
      <div className={styles.buttonWrapper}>
        <button
          className={styles.secondaryButton}
          onClick={handleGoBack}>
          아이디어 다시보기
          <IdeaReplayIcon />
        </button>
      </div>
    </div>
  );
};
