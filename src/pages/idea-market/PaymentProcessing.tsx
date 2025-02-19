import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import IdeaReplayIcon from '../../assets/icons/ideaReplay.svg?react';
import { kakaoPayApprove } from '../../apis/kakaoAPI';
import styles from './paymentProcessing.module.scss';

export const PaymentProcessing = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    const pgToken = searchParams.get('pg_token');
    const orderId = searchParams.get('orderId');
    const ideaId = searchParams.get('ideaId');

    if (!orderId || !ideaId) {
      navigate('/idea-market/payment-fail'); //결제 실패 페이지로 이동
      return;
    }

    if (!pgToken) {
      navigate('/idea-market/payment-cancel'); //결제 취소 처리
      return;
    }

    if (isApproved) {
      return;
    }

    const approvePayment = async () => {
      try {
        const response = await kakaoPayApprove({
          pgToken,
          orderId,
          ideaId: Number(ideaId),
        });
        setIsApproved(true);
        sessionStorage.setItem('paymentSuccessData', JSON.stringify(response));
        navigate('/idea-market/payment-success');
      } catch (error: unknown) {
        if (
          error instanceof Error &&
          (error as { response?: { status?: number } }).response?.status === 404
        ) {
          sessionStorage.setItem('isApproved', 'true');
          navigate('/idea-market/payment-success');
        } else {
          sessionStorage.setItem(
            'failReason',
            error instanceof Error ? error.message : '알 수 없는 오류',
          );
          navigate('/idea-market/payment-fail');
        }
      }
    };

    approvePayment();
  }, [navigate, isApproved, searchParams]);

  const goBackTwice = () => {
    window.history.go(-2);
  };

  return (
    <div className={styles.paymentContainer}>
      <div className={styles.spinner}></div>

      <h2 className={styles.title}>결제 진행 중입니다.</h2>
      <p className={styles.subtitle}>
        결제 완료까지 다소 시간이 걸릴 수 있습니다.
      </p>

      <p className={styles.description}>
        화면을 벗어나도 결제는 계속 진행되며,
        <br />
        주문결과는 ‘마이페이지 지원현황 아이디어마켓’에서 확인 할 수 있습니다.
      </p>

      <div className={styles.buttonGroup}>
        <button
          className={styles.replayButton}
          onClick={goBackTwice}>
          아이디어 다시보기
          <IdeaReplayIcon />
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

export default PaymentProcessing;
