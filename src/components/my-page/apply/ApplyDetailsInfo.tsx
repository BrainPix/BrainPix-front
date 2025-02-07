import styles from './itemDetailsInfo.module.scss';
import arrowItemDetailsButtonIcon from '../../../assets/icons/arrowButton.svg';

interface ApplyDetailsInfoProps {
  tab: string;
  category: string;
  itemName: string;
  part: string;
}

export const ApplyDetailsInfo = ({
  tab,
  category,
  itemName,
  part,
}: ApplyDetailsInfoProps) => {
  return (
    <>
      <div className={styles.itemDetails}>
        <div className={styles.mainImage}></div>
        <div className={styles.itemInfo}>
          <div className={styles.route}>
            {tab} &gt; {category}
          </div>
          <div className={styles.itemName}>{itemName}</div>
        </div>
        <div className={styles.quantityBox}>
          <span className={styles.quantityText}>지원파트</span>
          <span className={styles.quantityValue}>{part}</span>
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
