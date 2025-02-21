import { useNavigate } from 'react-router-dom';
import styles from './itemDetailsInfo.module.scss';
import arrowItemDetailsButtonIcon from '../../../assets/icons/arrowButton.svg';
import { Image } from '../../common/image/Image';
import { getCategoryLabel } from '../../../utils/categoryMapping';

interface PurchaseDetailsInfoProps {
  ideaId: number;
  tab: string;
  specialization: string;
  itemName: string;
  price: number;
  quantity: number;
}

export const PurchaseDetailsInfo = ({
  ideaId,
  tab,
  specialization,
  itemName,
  price,
  quantity,
}: PurchaseDetailsInfoProps) => {
  const FORMATTED_SPECIALIZATION = getCategoryLabel(specialization);

  const navigate = useNavigate();
  const handleNavigate = () => {
    console.log('ideaId', ideaId);
    navigate(`/idea-market/registered/${ideaId}`);
  };

  return (
    <>
      <div className={styles.itemDetails}>
        <div className={styles.mainImage}></div>
        <div className={styles.itemInfo}>
          <div className={styles.route}>
            {tab} &gt; {FORMATTED_SPECIALIZATION}
          </div>
          <div className={styles.itemName}>{itemName}</div>
          <div className={styles.price}>{price.toLocaleString()} 원</div>
        </div>
        <div className={styles.quantityBox}>
          <span className={styles.quantityText}>수량</span>
          <span className={styles.quantityValue}>{quantity}개</span>
        </div>
        <div className={styles.itemDetailsButtonContainer}>
          <button
            className={styles.itemDetailsButton}
            onClick={handleNavigate}>
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
