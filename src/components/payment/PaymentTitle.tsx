import { useState, useEffect } from 'react';
import styles from './paymentTitle.module.scss';
import UpDownButton from '../../assets/icons/upDownButton.svg?react';

const MIN_QUANTITY = 0;
const MAX_QUANTITY = 10;

const PaymentTitle = () => {
  const [quantity, setQuantity] = useState(1);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (showError) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showError]);

  const increaseQuantity = () => {
    if (quantity < MAX_QUANTITY) {
      setQuantity((prev) => prev + 1);
    } else {
      setShowError(true); // 최대 수량 초과 시 에러 모달 표시
    }
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > MIN_QUANTITY ? prev - 1 : prev));
  };

  const closeErrorModal = () => {
    setShowError(false);
  };

  return (
    <div className={styles.paymentTitle}>
      <div className={styles.title}>결제하기</div>
      <div className={styles.content}>
        <div className={styles.image}></div>
        <div className={styles.text}>
          <div className={styles.price}>2,000,000원</div>
          <div className={styles.description}>디자인 해드립니다</div>
        </div>
        <div className={styles.quantityContainer}>
          <span className={styles.quantityLabel}>구매 수량</span>
          <div className={styles.quantityBox}>
            <span className={styles.quantity}>{quantity} 개</span>
            <div className={styles.buttonGroup}>
              <button
                type='button'
                className={styles.upButton}
                onClick={increaseQuantity}
                aria-label='수량 증가'>
                <UpDownButton className={styles.upIcon} />
              </button>
              <button
                type='button'
                className={styles.downButton}
                onClick={decreaseQuantity}
                aria-label='수량 감소'>
                <UpDownButton className={styles.downIcon} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {showError && (
        <div className={styles.errorOverlay}>
          <div className={styles.errorModal}>
            <div className={styles.errorHeader}>
              <div className={styles.errorContent}>
                판매자가 설정한 수량 제한이 초과하였습니다.
                <br />
                (최대 {MAX_QUANTITY}개)
              </div>
            </div>
            <button
              className={styles.errorButton}
              onClick={closeErrorModal}>
              닫기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentTitle;
