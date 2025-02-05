import styles from './postAuthorInfo.module.scss';
import Label from '../../common/label/Label';
import arrowMessageButtonIcon from '../../../assets/icons/messageArrowButton.svg';

interface PostAuthorInfoProps {
  seller: string;
}

export const PostAuthorInfo = ({ seller }: PostAuthorInfoProps) => {
  return (
    <>
      <div className={styles.sellerInfoAndMessage}>
        <div className={styles.sellerInfo}>
          <span className={styles.sellerInfoTitle}>게시물 관리자 정보</span>
          <div className={styles.sellerAndLabel}>
            <span className={styles.seller}>{seller}</span>
            <Label
              text='개인'
              type='personal'
            />
          </div>
        </div>
        <div className={styles.messageButtonContainer}>
          <button className={styles.messageButton}>메신저 보내기</button>
          <img
            src={arrowMessageButtonIcon}
            alt='화살표'
            className='arrowMessageButton'
          />
        </div>
      </div>
    </>
  );
};
