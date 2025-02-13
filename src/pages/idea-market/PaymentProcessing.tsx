import { useNavigate } from 'react-router-dom';
import IdeaReplayIcon from '../../assets/icons/ideaReplay.svg?react';
import './paymentProcessing.module.scss';

export const PaymentProcessing = () => {
  const navigate = useNavigate();

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
