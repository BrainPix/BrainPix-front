import styles from './authorInfo.module.scss';
import ProfileIcon from '../../assets/icons/nonprofile.svg';
import ArrowIcon from '../../assets/icons/arrow-up-2-thin.svg';

const AuthorInfo = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>작성자 정보</h1>
        <img
          src={ArrowIcon}
          alt='화살표'
          className={styles.arrowIcon}
        />
      </div>
      <div className={styles.divider}></div>
      <div className={styles.content}>
        <div className={styles.profile}>
          <img
            src={ProfileIcon}
            alt='프로필'
            className={styles.profileIcon}
          />
          <span className={styles.name}>SEO YEON</span>
        </div>
        <button className={styles.messageButton}>
          <div className={styles.messageText}>메신저 보내기</div>
        </button>
      </div>
      <div className={styles.infoBox}>
        <div className={styles.infoItem}>
          <span className={styles.infoTitle}>분야</span>
          <span className={styles.infoValue}>기획/디자인</span>
        </div>
        <div className={styles.dividerLine}></div>
        <div className={styles.infoItem}>
          <span className={styles.infoTitle}>아이디어</span>
          <span className={styles.infoValue}>2</span>
        </div>
        <div className={styles.dividerLine}></div>
        <div className={styles.infoItem}>
          <span className={styles.infoTitle}>협업 경험</span>
          <span className={styles.infoValue}>4</span>
        </div>
      </div>
    </div>
  );
};

export default AuthorInfo;
