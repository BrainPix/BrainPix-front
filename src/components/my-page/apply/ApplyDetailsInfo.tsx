import { useNavigate } from 'react-router-dom';
import styles from './itemDetailsInfo.module.scss';
import arrowItemDetailsButtonIcon from '../../../assets/icons/arrowButton.svg';
import { Image } from '../../common/image/Image';
import { getCategoryLabel } from '../../../utils/categoryMapping';

interface ApplyDetailsInfoProps {
  postId: number;
  tab: string;
  specialization: string;
  itemName: string;
  part: string;
}

export const ApplyDetailsInfo = ({
  postId,
  tab,
  specialization,
  itemName,
  part,
}: ApplyDetailsInfoProps) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    if (tab === '요청 과제') navigate(`/request-assign/registered/${postId}`);
    if (tab === '협업 광장')
      navigate(`/collaboration/postdetailwithlink/${postId}`);
  };

  const FORMMATED_SPECIALIZATION = getCategoryLabel(specialization);
  const FORMMATED_PART = getCategoryLabel(part);

  return (
    <>
      <div className={styles.itemDetails}>
        <div className={styles.mainImage}></div>
        <div className={styles.itemInfo}>
          <div className={styles.route}>
            {tab} &gt; {FORMMATED_SPECIALIZATION}
          </div>
          <div className={styles.itemName}>{itemName}</div>
        </div>
        <div className={styles.quantityBox}>
          <span className={styles.quantityText}>지원파트</span>
          <span className={styles.quantityValue}>{FORMMATED_PART}</span>
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
