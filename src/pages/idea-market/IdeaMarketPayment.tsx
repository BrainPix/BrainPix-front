import PaymentTitle from '../../components/payment/PaymentTitle';
import SellerInfo from '../../components/payment/SellerInfo';
import PaymentSummary from '../../components/payment/PaymentSummary';
import styles from './ideaMarketPayment.module.scss';

import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getIdeaMarketPayment } from '../../apis/purchaseAPI';
import { IdeaMarketPurchase } from '../../types/purchaseType';

export const IdeaMarketPayment = () => {
  const { ideaId } = useParams<{ ideaId: string }>();
  const parsedIdeaId = ideaId && !isNaN(Number(ideaId)) ? Number(ideaId) : null;
  const [quantity, setQuantity] = useState(1);

  const { data, isLoading, error } = useQuery<IdeaMarketPurchase, Error>({
    queryKey: ['ideaMarketPayment', ideaId],
    queryFn: () => getIdeaMarketPayment(Number(ideaId)),
    enabled: !!parsedIdeaId,
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
    quantity,
    setQuantity,
  };

  const sellerInfoData = {
    name: data.name,
    profileImageUrl: data.profileImageUrl,
    email: data.email,
  };

  const paymentSummaryData = {
    price: data.price,
    ideaId: data.ideaId,
    sellerId: data.sellerId,
  };

  return (
    <>
      <div className={styles.ideaMarketPaymentLayout}>
        <PaymentTitle {...paymentTitleData} />
        <SellerInfo {...sellerInfoData} />
        <PaymentSummary
          {...paymentSummaryData}
          quantity={quantity}
        />
      </div>
    </>
  );
};
