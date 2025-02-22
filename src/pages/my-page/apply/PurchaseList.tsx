import { useQuery } from '@tanstack/react-query';
import { Purchase } from '../../../types/supportsType';
import { getPurchases } from '../../../apis/supportsAPI';
import styles from './purchaseList.module.scss';
import { CardHeader } from '../../../components/my-page/apply/CardHeader';
import { PostAuthorInfo } from '../../../components/my-page/apply/PostAuthorInfo';
import { PurchaseDetailsInfo } from '../../../components/my-page/apply/PurchaseDetailsInfo';
import { PayInfo } from '../../../components/my-page/apply/PayInfo';
import LoadingPage from '../../loading/LoadingPage';
import { ErrorPage } from '../../errorPage/ErrorPage';

export const PurchaseList = () => {
  const {
    data: purchases = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['purchases', 0, 10],
    queryFn: () => getPurchases(0, 10),
  });

  if (isLoading) return <LoadingPage />;
  if (isError) return <ErrorPage />;

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
                labelText={purchase.writerType}
                labelType={purchase.writerType}
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
