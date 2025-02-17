import styles from './sellerInfo.module.scss';
import { imageErrorHandler } from '../../utils/imageErrorHandler';

interface SellerInfoProps {
  name: string;
  profileImageUrl: string;
  email: string;
}

const SellerInfo = ({ name, profileImageUrl, email }: SellerInfoProps) => {
  return (
    <div className={styles.sellerInfo}>
      <div className={styles.title}>판매자 정보</div>
      <div className={styles.infoBox}>
        <img
          src={profileImageUrl}
          alt='판매자 프로필'
          className={styles.profile}
          onError={imageErrorHandler}
        />
        <div className={styles.name}>{name}</div>
        <div className={styles.email}>{email}</div>
      </div>
    </div>
  );
};

export default SellerInfo;
