import styles from './paymentFail.module.scss';
import FailIcon from '../../assets/icons/failIcon.svg?react';
import IdeaReplayIcon from '../../assets/icons/ideaReplay.svg?react';

export const PaymentFail = () => {
  const goBackTwice = () => {
    window.history.go(-2);
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
          onClick={goBackTwice}>
          아이디어 다시보기
          <IdeaReplayIcon />
        </button>
      </div>
    </div>
  );
};
