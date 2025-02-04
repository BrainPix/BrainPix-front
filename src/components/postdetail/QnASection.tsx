import styles from './qnaSection.module.scss';

const QnASection = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>담당자 Q&A</h1>
      <div className={styles.divider}></div>
      <div className={styles.inputContainer}>
        <textarea
          className={styles.textArea}
          placeholder=''
        />
        <button className={styles.submitButton}>등록</button>
      </div>
      <div className={styles.qnaItem}>
        <div className={styles.profile}>
          <div className={styles.profileIcon}></div>
        </div>
        <div className={styles.content}>
          <div className={styles.header}>
            <span className={styles.id}>아이디</span>
          </div>
          <span className={styles.date}>2025/01/01</span>
          <p className={styles.question}>연락드려도 될까요?</p>
          <div className={styles.actions}>
            <button className={styles.actionButton}>답글쓰기</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QnASection;
