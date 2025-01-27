import styles from './requestAssignEdit.module.scss';

export const RequestAssignEdit = () => {
  return (
    <div>
      <div className={styles.header}>
        <h1 className={styles.companyName}>SY TECH</h1>
        <div className={styles.actions}>
          <button className={styles.actionButton}>수정하기</button>
          <button className={styles.actionButton}>삭제하기</button>
        </div>
      </div>
      <div>
        <div className={styles.imageWrapper}>
          <img
            src='#'
            alt='대표사진'
            className={styles.mainImage}
          />
        </div>
        <div className={styles.details}>
          <h2 className={styles.title}>Web 서비스 제안</h2>
          <p className={styles.date}>2024/12/26 · 조회 120 · 저장 12</p>
          <button className={styles.applyButton}>지원하기</button>
        </div>
      </div>
    </div>
  );
};
