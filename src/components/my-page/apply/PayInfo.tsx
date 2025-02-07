import styles from './payInfo.module.scss';

interface PayInfoProps {
  payment: string;
  price: number;
  fee: number;
}

export const PayInfo = ({ payment, price, fee }: PayInfoProps) => {
  return (
    <>
      <div className={styles.payInfoTitle}>결제 정보</div>
      <div className={styles.priceInfo}>
        <div className={styles.toalPriceInfo}>
          <div className={styles.priceInfoTitle}>최종 결제 금액</div>
          <div className={styles.totalPriceAndPayment}>
            <div className={styles.totalPrice}>
              {(price + fee).toLocaleString()}원
            </div>
            <div className={styles.payment}>{payment}</div>
          </div>
        </div>
        {/* 주문 금액 + 수수료 */}
        <div className={styles.priceInfoDetails}>
          <div className={styles.priceInfoDetailsText}>주문 금액</div>
          <div className={styles.payment}>{price.toLocaleString()}원</div>
        </div>
        <div className={styles.priceInfoDetails}>
          <div className={styles.priceInfoDetailsText}>수수료</div>
          <div className={styles.payment}>{fee.toLocaleString()}원</div>
        </div>
      </div>
    </>
  );
};
