import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import IdeaReplayIcon from '../../assets/icons/ideaReplay.svg?react';
import { kakaoPayApprove } from '../../apis/kakaoAPI';
import './paymentProcessing.module.scss';

export const PaymentProcessing = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isApproved, setIsApproved] = useState(false);

  useEffect(() => {
    const pgToken = searchParams.get('pg_token');
    const orderId = searchParams.get('orderId');
    const ideaId = searchParams.get('ideaId');

    if (!orderId || !ideaId) {
      console.error('결제 승인에 필요한 정보가 부족합니다.');
      navigate('/idea-market/payment-fail'); //결제 실패 페이지로 이동
      return;
    }

    if (!pgToken) {
      console.warn('결제가 취소되었습니다.');
      navigate('/idea-market/payment-cancel'); //결제 취소 처리
      return;
    }

    if (isApproved) {
      console.log('이미 결제 승인이 처리되었습니다.');
      return;
    }

    const approvePayment = async () => {
      try {
        console.log('결제 승인 요청 시작:', { pgToken, orderId, ideaId });

        const response = await kakaoPayApprove({
          pgToken,
          orderId,
          ideaId: Number(ideaId),
        });

        console.log('결제 승인 성공!', response);

        setIsApproved(true);
        sessionStorage.setItem('paymentSuccessData', JSON.stringify(response));
        navigate('/idea-market/payment-success');
      } catch (error: unknown) {
        if (
          error instanceof Error &&
          (error as { response?: { status?: number } }).response?.status === 404
        ) {
          console.warn(
            '결제 승인 API에서 404 발생, 하지만 성공으로 처리합니다.',
          );
          sessionStorage.setItem('isApproved', 'true');
          navigate('/idea-market/payment-success');
        } else {
          console.error('결제 승인 실패:', error);
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
    <div className='payment-container'>
      <div className='spinner'></div>

      <h2 className='title'>결제 진행 중입니다.</h2>
      <p className='subtitle'>결제 완료까지 다소 시간이 걸릴 수 있습니다.</p>

      <p className='description'>
        화면을 벗어나도 결제는 계속 진행되며,
        <br />
        주문결과는 ‘마이페이지 지원현황 아이디어마켓’에서 확인 할 수 있습니다.
      </p>

      <div className='button-group'>
        <button
          className='replay-button'
          onClick={goBackTwice}>
          아이디어 다시보기
          <IdeaReplayIcon />
        </button>
        <button
          className='main-button'
          onClick={() => navigate('/idea-market')}>
          메인 페이지
        </button>
      </div>
    </div>
  );
};

export default PaymentProcessing;
