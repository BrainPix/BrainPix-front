import styles from './purchaseList.module.scss';
import Label from '../../../components/common/label/Label';

export const PurchaseList = () => {
  const PURCHASE_DATA = [
    {
      id: 1,
      date: '2024/12/24',
      seller: 'SEO YEON',
      item: '디자인해 주세요',
      price: 200000,
      payment: '카카오페이',
      total: 120500,
      fee: 500,
    },
    {
      id: 2,
      date: '2024/12/24',
      seller: 'SEO YEON',
      item: '디자인해 주세요',
      price: 200000,
      payment: '카카오페이',
      total: 120500,
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
          <div className={styles.cardHeader}>
            <span>
              <Label
                text='구매 완료'
                type='purchaseCompleted'
              />
            </span>
            <span className={styles.date}>{purchase.date}</span>
          </div>
          <div className={styles.cardTitle}>구매 상세 내역</div>
          <div className={styles.cardContent}>
            <div className={styles.sellerInfo}>
              <div className={styles.sellerInfoTitle}>게시물 관리자 정보</div>
              <div className={styles.seller}>{purchase.seller}</div>
              <Label
                text='개인'
                type='personal'
              />
            </div>
            <div className={styles.iteDetails}>
              <strong>{purchase.item}</strong>
              <br />
              주문 금액: {purchase.price.toLocaleString()}원
            </div>
            <div className={styles.cardTitle}>결제 정보</div>
            <div className={styles.priceInfo}>
              <p>최종 결제 금액: {purchase.total.toLocaleString()}원</p>
              <p>결제 방법: {purchase.payment}</p>
              <p>수수료: {purchase.fee.toLocaleString()}원</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
