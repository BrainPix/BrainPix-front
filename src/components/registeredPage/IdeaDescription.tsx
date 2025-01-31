import styles from './ideaDescription.module.scss';

const IdeaDescription = () => {
  const handleOpenClick = () => {};
  const handleDownloadClick = () => {};

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>아이디어 설명</h1>
        <div className={styles.divider}></div>
      </div>
      <p className={styles.description}>아이디어 설명입니다...</p>
      <div className={styles.attachment}>
        <h1 className={styles.attachmentTitle}>
          첨부파일 <span className={styles.pdf}>(PDF)</span>
        </h1>
        <div className={styles.attachmentBox}>
          <span className={styles.fileName}>첨부파일입니다... .pdf</span>
          <div className={styles.actions}>
            <button
              className={styles.open}
              onClick={handleOpenClick}>
              열기
            </button>
            <span className={styles.separator}>|</span>
            <button
              className={styles.download}
              onClick={handleDownloadClick}>
              다운로드
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeaDescription;
