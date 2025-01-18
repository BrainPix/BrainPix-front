import React from 'react';
import styles from './sellerInfo.module.scss';

const SellerInfo: React.FC = () => {
  return (
    <div className={styles.sellerInfo}>
      <div className={styles.title}>판매자 정보</div>
      <div className={styles.infoBox}>
        <div className={styles.profile}></div>
        <div className={styles.name}>SEOYEON</div>
        <div className={styles.email}>erwer@naver.com</div>
      </div>
    </div>
  );
};

export default SellerInfo;
