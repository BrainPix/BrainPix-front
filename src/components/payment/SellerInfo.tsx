import styles from './sellerInfo.module.scss';

interface SellerInfoProps {
  name: string;
  profileImageUrl: string;
}

const SellerInfo = ({ name, profileImageUrl }: SellerInfoProps) => {
  return (
    <div className={styles.sellerInfo}>
      <div className={styles.title}>판매자 정보</div>
      <div className={styles.infoBox}>
        <img
          src={profileImageUrl || '/default-profile.png'}
          alt='판매자 프로필'
          className={styles.profile}
        />
        <div className={styles.name}>{name}</div>
        <div className={styles.email}>erwer@naver.com</div>
      </div>
    </div>
  );
};

export default SellerInfo;
