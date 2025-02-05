import styles from './postAuthorInfo.module.scss';
import Label from '../../common/label/Label';
import arrowMessageButtonIcon from '../../../assets/icons/messageArrowButton.svg';
import { isValidLabelType } from '../../../utils/isValidLabelType';

interface PostAuthorInfoProps {
  seller: string;
  labelText: string;
  labelType: string;
}

export const PostAuthorInfo = ({ seller, labelText, labelType }: PostAuthorInfoProps) => {
  return (
    <>
      <div className={styles.sellerInfoAndMessage}>
        <div className={styles.sellerInfo}>
          <span className={styles.sellerInfoTitle}>게시물 관리자 정보</span>
          <div className={styles.sellerAndLabel}>
            <span className={styles.seller}>{seller}</span>
            <Label
              text={labelText}
              type={isValidLabelType(labelType) ? labelType : 'personal'}
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
