import { useQuery } from '@tanstack/react-query';
import { Purchase } from '../../../types/supportsType';
import { getPurchases } from '../../../apis/supportsAPI';
import styles from './purchaseList.module.scss';
import { CardHeader } from '../../../components/my-page/apply/CardHeader';
import { PostAuthorInfo } from '../../../components/my-page/apply/PostAuthorInfo';
import { PurchaseDetailsInfo } from '../../../components/my-page/apply/PurchaseDetailsInfo';
import { PayInfo } from '../../../components/my-page/apply/PayInfo';

export const PurchaseList = () => {
  const FORM_DATA = {
    labelText: '기업',
    labelType: 'corporate',
  };

  const {
    data: purchases = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['purchases', 0, 10],
    queryFn: () => getPurchases(0, 10),
  });

  if (isLoading) return <p>로딩 중...</p>;
  if (isError) return <p>데이터를 불러오는 중 오류 발생</p>;

  return (
    <div className={styles.container}>
      <div className={styles.sectionTitle}>
        <span className={styles.sectionMainTitle}>지원 현황</span>
        <span className={styles.sectionSubTitle}>구매 내역</span>
      </div>

      {purchases?.length > 0 ? (
        purchases.map((purchase: Purchase) => (
          <div
            className={styles.purchaseCard}
            key={purchase.purchasingId}>
            <CardHeader
              date={purchase.purchasedAt}
              status='구매 완료'
              statusType='purchaseCompleted'
              cardTitle={'구매 상세 내역'}
            />
            <div className={styles.cardContent}>
              <PostAuthorInfo
                seller={purchase.writerName}
                labelText={FORM_DATA.labelText}
                labelType={FORM_DATA.labelType}
              />
              <PurchaseDetailsInfo
                ideaId={purchase.purchasingId}
                tab='아이디어 마켓'
                specialization={purchase.specialization}
                itemName={purchase.title}
                price={purchase.finalPrice}
                quantity={purchase.quantity}
              />
              <PayInfo
                payment='카카오페이'
                price={purchase.finalPrice}
                fee={purchase.fee}
              />
            </div>
          </div>
        ))
      ) : (
        <div>구매 내역이 없습니다.</div>
      )}
    </div>
  );
};
