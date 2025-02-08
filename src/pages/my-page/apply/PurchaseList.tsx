import styles from './purchaseList.module.scss';
import { CardHeader } from '../../../components/my-page/apply/CardHeader';
import { PostAuthorInfo } from '../../../components/my-page/apply/PostAuthorInfo';
import { PurchaseDetailsInfo } from '../../../components/my-page/apply/PurchaseDetailsInfo';
import { PayInfo } from '../../../components/my-page/apply/PayInfo';

export const PurchaseList = () => {
  const FORM_DATA = {
    cardTitle: '구매 상세 내역',
    labelText: '기업',
    labelType: 'corporate',
  };
  const PURCHASE_DATA = [
    {
      id: 1,
      status: '구매 완료',
      statusType: 'purchaseCompleted',
      date: '2024/12/24',
      seller: 'SEO YEON',
      tab: '아이디어 마켓',
      category: '디자인',
      itemName: '디자인 해드립니다',
      price: 200000,
      payment: '카카오페이',
      fee: 500,
    },
    {
      id: 2,
      status: '구매 완료',
      statusType: 'purchaseCompleted',
      date: '2024/12/24',
      seller: 'SEO YEON',
      tab: '아이디어 마켓',
      category: '디자인',
      itemName: '디자인 해드립니다',
      price: 200000,
      payment: '카카오페이',
      fee: 500,
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.sectionTitle}>
        <span className={styles.sectionMainTitle}>지원 현황</span>
        <span className={styles.sectionSubTitle}>구매 내역</span>
      </div>
      {PURCHASE_DATA.map((purchase) => (
        <div
          className={styles.purchaseCard}
          key={purchase.id}>
          <CardHeader
            date={purchase.date}
            status={purchase.status}
            statusType={purchase.statusType}
            cardTitle={FORM_DATA.cardTitle}
          />
          <div className={styles.cardContent}>
            <PostAuthorInfo
              seller={purchase.seller}
              labelText={FORM_DATA.labelText}
              labelType={FORM_DATA.labelType}
            />
            <PurchaseDetailsInfo
              tab={purchase.tab}
              category={purchase.category}
              itemName={purchase.itemName}
              price={purchase.price}
            />
            <PayInfo
              payment={purchase.payment}
              price={purchase.price}
              fee={purchase.fee}
            />
          </div>
        </div>
      ))}
    </div>
  );
};
