import styles from './requestAssignRegisterComplete.module.scss';
import FinishIcon from '../../assets/icons/finishIcon.svg?react';
import { useNavigate, useParams } from 'react-router-dom';

export const RequestAssignRegisterComplete = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();

  const handleRegisteredClick = () => {
    navigate(`/request-assign/registered/${taskId}`);
  };

  const handleMyPageClick = () => {
    navigate('/my');
  };

  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <FinishIcon />
      </div>
      <h1 className={styles.title}>요청 과제 등록 완료!</h1>
      <p className={styles.description}>
        창의적인 <span className={styles.highlight}>브레인픽스의 가족들이</span>
        {'\n'}곧 응답할거에요!
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
