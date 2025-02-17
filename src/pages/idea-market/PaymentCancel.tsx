import styles from './paymentFail.module.scss';
import FailIcon from '../../assets/icons/failIcon.svg?react';
import IdeaReplayIcon from '../../assets/icons/ideaReplay.svg?react';

export const PaymentCancel = () => {
  const goBackTwice = () => {
    window.history.go(-3);
  };

  return (
    <div className={styles.container}>
      <div className={styles.iconWrapper}>
        <FailIcon />
      </div>
      <h1 className={styles.title}>결제가 취소 되었습니다.</h1>
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
