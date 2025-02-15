import { useState, useEffect } from 'react';
import React from 'react';
import styles from './paymentTitle.module.scss';
import UpDownButton from '../../assets/icons/upDownButton.svg?react';

interface PaymentTitleProps {
  thumbnailImageUrl: string;
  title: string;
  remainingQuantity: number;
  price: number;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

const PaymentTitle = ({
  thumbnailImageUrl,
  title,
  remainingQuantity,
  price,
  quantity,
  setQuantity,
}: PaymentTitleProps) => {
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
    if (quantity < remainingQuantity) {
      setQuantity((prev) => prev + 1);
    } else {
      setShowError(true);
    }
  };

  const decreaseQuantity = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const closeErrorModal = () => {
    setShowError(false);
  };

  return (
    <div className={styles.paymentTitle}>
      <div className={styles.title}>결제하기</div>
      <div className={styles.content}>
        <img
          src={thumbnailImageUrl || '/default-thumbnail.png'}
          alt='상품 썸네일'
          className={styles.image}
        />
        <div className={styles.text}>
          <div className={styles.price}>{price.toLocaleString()}원</div>
          <div className={styles.description}>{title}</div>
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
                (최대 {remainingQuantity}개)
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
