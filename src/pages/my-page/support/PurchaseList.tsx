import styles from './purchaseList.module.scss';
import Label from '../../../components/common/label/Label';
import arrowIcon from '../../../assets/icons/arrow-button.svg';

export const PurchaseList = () => {
  const PURCHASE_DATA = [
    {
      id: 1,
      date: '2024/12/24',
      seller: 'SEO YEON',
      tab: '아이디어 마켓',
      category: '디자인',
      itemName: '디자인해 주세요',
      price: 200000,
      payment: '카카오페이',
      fee: 500,
    },
    {
      id: 2,
      date: '2024/12/24',
      seller: 'SEO YEON',
      tab: '아이디어 마켓',
      category: '디자인',
      item: '디자인해주세요',
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
            <div className={styles.sellerInfoAndMessage}>
              <div className={styles.sellerInfo}>
                <span className={styles.sellerInfoTitle}>
                  게시물 관리자 정보
                </span>
                <div className={styles.sellerAndLabel}>
                  <span className={styles.seller}>{purchase.seller}</span>
                  <Label
                    text='개인'
                    type='personal'
                  />
                </div>
              </div>
              <div className={styles.messageButtonContainer}>
                <button className={styles.messageButton}>메신저 보내기</button>
                <img
                  src={arrowIcon}
                  alt='화살표'
                  className='arrowIcon'
                />
              </div>
            </div>
            <div className={styles.itemDetails}>
              <div className={styles.mainImage}></div>
              <div className={styles.itemInfo}>
                <div className={styles.route}>
                  {purchase.tab} &gt; {purchase.category}
                </div>
                <div className={styles.itemName}>{purchase.itemName}</div>
                <div className={styles.price}>
                  {purchase.price.toLocaleString()}
                </div>
              </div>
              <div className={styles.quantityBox}>
                <span className={styles.quantityText}>수량</span>
                <span className={styles.quantityValue}>1개</span>
              </div>
              <div className={styles.itemDetailsButtonContainer}>
                <button className={styles.itemDetailsButton}>
                  <img
                    src={arrowIcon}
                    alt='화살표'
                    className='arrowIcon'
                  />
                </button>
              </div>
            </div>
            <div className={styles.payInfoTitle}>결제 정보</div>
            <div className={styles.priceInfo}>
              <div className={styles.toalPriceInfo}>
                <div className={styles.priceInfoTitle}>최종 결제 금액</div>
                <div className={styles.totalPriceAndPayment}>
                  <div className={styles.totalPrice}>
                    {(purchase.price + purchase.fee).toLocaleString()}원
                  </div>
                  <div className={styles.payment}>{purchase.payment}</div>
                </div>
              </div>
              {/* 주문 금액 + 수수료 */}
              <div className={styles.priceInfoDetails}>
                <div className={styles.priceInfoDetailsText}>주문 금액</div>
                <div className={styles.payment}>
                  {purchase.price.toLocaleString()}원
                </div>
              </div>
              <div className={styles.priceInfoDetails}>
                <div className={styles.priceInfoDetailsText}>수수료</div>
                <div className={styles.payment}>
                  {purchase.fee.toLocaleString()}원
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
