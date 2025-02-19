import { ChangeEvent } from 'react';
import styles from './priceAndQuantity.module.scss';
import UpButton from '../../../assets/icons/categoryUpButton.svg?react';
import DownButton from '../../../assets/icons/categoryDownButton.svg?react';
import DisabledDownButton from '../../../assets/icons/disabledDownButton.svg?react';

interface PriceAndQuantityProps {
  price: string;
  onPriceChange: (e: ChangeEvent<HTMLInputElement>) => void;
  quantity: number;
  onQuantityChange: (e: ChangeEvent<HTMLInputElement>) => void;
  handleIncrement: () => void;
  handleDecrement: () => void;
  pageType: 'Idea Solution' | 'Market Place';
}

export const PriceAndQuantity = ({
  price,
  onPriceChange,
  quantity,
  onQuantityChange,
  handleIncrement,
  handleDecrement,
  pageType,
}: PriceAndQuantityProps) => {
  return (
    <div className={styles.priceQuantityContainer}>
      <div className={styles.priceGroup}>
        <div className={styles.priceLabel}>
          책정 금액 <span className={styles.required}>(필수)</span>
        </div>
        <div className={styles.inputWrapper}>
          <input
            type='text'
            value={price}
            onChange={onPriceChange}
            className={styles.input}
          />
          <span className={styles.unit}>원</span>
        </div>
      </div>
      {pageType === 'Market Place' && (
        <div className={styles.quantityGroup}>
          <div className={styles.quantityLabel}>
            수량 설정 <span className={styles.required}>(필수)</span>
          </div>
          <div className={styles.inputWrapper}>
            <input
              type='text'
              value={quantity}
              onChange={onQuantityChange}
              className={styles.input}
            />
            <span className={styles.unit}>개</span>
            <div className={styles.quantityControlWrapper}>
              <button
                onClick={handleIncrement}
                className={styles.quantityButton}>
                <UpButton />
              </button>
              <button
                onClick={handleDecrement}
                className={styles.quantityButton}
                disabled={quantity === 0}>
                {quantity === 0 ? <DisabledDownButton /> : <DownButton />}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
