import styles from './requestAssignEdit.module.scss';

export const RequestAssignEdit = () => {
  return (
    <div>
      {/* 게시글 작성자의 이미지, 단체명, 수정&삭제 버튼 */}
      <div className={styles.header}>
        <div className={styles.companyInfo}>
          <div className={styles.companyImage}></div>
          <div className={styles.companyName}>SY TECH</div>
        </div>
        <div className={styles.actions}>
          <button className={styles.actionButton}>수정하기</button>
          <div className={styles.buttonDivider}></div>
          <button className={styles.actionButton}>삭제하기</button>
        </div>
      </div>
      {/* 게시글 내용 */}
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
