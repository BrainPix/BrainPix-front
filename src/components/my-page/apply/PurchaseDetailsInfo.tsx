import styles from './itemDetailsInfo.module.scss';
import arrowItemDetailsButtonIcon from '../../../assets/icons/arrowButton.svg';
import { Image } from '../../common/image/Image';
import { getCategoryLabel } from '../../../utils/categoryMapping';

interface PurchaseDetailsInfoProps {
  tab: string;
  specialization: string;
  itemName: string;
  price: number;
}

export const PurchaseDetailsInfo = ({
  tab,
  specialization,
  itemName,
  price,
}: PurchaseDetailsInfoProps) => {
  const FORMATTED_SPECIALIZATION = getCategoryLabel(specialization);
  return (
    <>
      <div className={styles.itemDetails}>
        <div className={styles.mainImage}></div>
        <div className={styles.itemInfo}>
          <div className={styles.route}>
            {tab} &gt; {FORMATTED_SPECIALIZATION}
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
            <Image
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
