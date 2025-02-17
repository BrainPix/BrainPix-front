import styles from './itemDetailsInfo.module.scss';
import arrowItemDetailsButtonIcon from '../../../assets/icons/arrow-button.svg';

interface PurchaseDetailsInfoProps {
  tab: string;
  category: string;
  itemName: string;
  price: number;
}

export const PurchaseDetailsInfo = ({
  tab,
  category,
  itemName,
  price,
}: PurchaseDetailsInfoProps) => {
  return (
    <>
      <div className={styles.itemDetails}>
        <div className={styles.mainImage}></div>
        <div className={styles.itemInfo}>
          <div className={styles.route}>
            {tab} &gt; {category}
          </div>
          <div className={styles.itemName}>{itemName}</div>
          <div className={styles.price}>{price.toLocaleString()}</div>
        </div>
        <div className={styles.quantityBox}>
          <span className={styles.quantityText}>수량</span>
          <span className={styles.quantityValue}>1개</span>
        </div>
        <div className={styles.itemDetailsButtonContainer}>
          <button className={styles.itemDetailsButton}>
            <img
              src={arrowItemDetailsButtonIcon}
              alt='화살표'
              className='arrowItemDetailsButton'
            />
          </button>
        </div>
      </div>
    </>
  );
};
