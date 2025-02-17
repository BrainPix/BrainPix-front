import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { kakaoPayApprove } from '../../apis/kakaoAPI';
import { useMutation } from '@tanstack/react-query';

const PaymentApproval = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const pgToken = searchParams.get('pg_token');
  const orderId = searchParams.get('orderId');
  const ideaId = searchParams.get('ideaId');

  const { mutate: approvePayment, isPending } = useMutation({
    mutationFn: kakaoPayApprove,
    onSuccess: () => {
      navigate(`/purchase/success/${ideaId}`);
    },
    onError: () => {
      navigate(`/purchase/fail/${ideaId}`);
    },
  });

  useEffect(() => {
    if (!pgToken || !orderId || !ideaId) {
      navigate('/purchase/fail');
      return;
    }

    approvePayment({ pgToken, orderId, ideaId: Number(ideaId) });
  }, [pgToken, orderId, ideaId, approvePayment, navigate]);

  return <div>{isPending ? '결제 승인 중...' : '결제 승인 처리 완료'}</div>;
};

export default PaymentApproval;
