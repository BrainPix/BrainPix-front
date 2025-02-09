import PaymentTitle from '../../components/payment/PaymentTitle';
import SellerInfo from '../../components/payment/SellerInfo';
import PaymentMethods from '../../components/payment/PaymentMethods';
import PaymentSummary from '../../components/payment/PaymentSummary';
import PaymentButton from '../../components/payment/PaymentButton';
import styles from './ideaMarketPayment.module.scss';

import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getIdeaMarketPayment } from '../../apis/purchaseAPI';
import { IdeaMarketPurchase } from '../../types/purchaseType';

export const IdeaMarketPayment = () => {
  const { ideaId } = useParams<{ ideaId: string }>();

  const { data, isLoading, error } = useQuery<IdeaMarketPurchase, Error>({
    queryKey: ['ideaMarketPayment', ideaId],
    queryFn: () => getIdeaMarketPayment(Number(ideaId)),
    enabled: !!ideaId,
    staleTime: 1000 * 60 * 5, // 5분 캐싱
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생!</div>;
  if (!data) return null;

  const paymentTitleData = {
    thumbnailImageUrl: data.thumbnailImageUrl,
    title: data.title,
    remainingQuantity: data.remainingQuantity,
    price: data.price,
  };

  const sellerInfoData = {
    name: data.name,
    profileImageUrl: data.profileImageUrl,
  };

  const paymentSummaryData = {
    price: data.price,
  };

  return (
    <>
      <div className={styles.ideaMarketPaymentLayout}>
        <PaymentTitle {...paymentTitleData} />
        <SellerInfo {...sellerInfoData} />
        <PaymentMethods />
        <PaymentSummary {...paymentSummaryData} />
        <PaymentButton
          isPaymentReady={data.remainingQuantity > 0}
          onPaymentClick={() => console.log('결제 진행')}
        />
      </div>
    </>
  );
};
