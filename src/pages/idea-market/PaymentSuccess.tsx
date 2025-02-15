import styles from './paymentSuccess.module.scss';
import FinishIcon from '../../assets/icons/finishIcon.svg?react';
import { useNavigate } from 'react-router-dom';

export const PaymentSuccess = () => {
  const navigate = useNavigate();

  const handleMyPageClick = () => {
    navigate('/my/apply-idea-market'); // 구매내역 바로가기로 이동
  };

  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <FinishIcon />
      </div>
      <h1 className={styles.title}>결제가 완료 되었습니다!</h1>
      <div className={styles.buttonWrapper}>
        <button
          onClick={handleMyPageClick}
          className={styles.secondaryButton}>
          <span>구매내역 바로가기</span>
        </button>
      </div>
    </div>
  );
};
