import styles from '../postdetail/taskDescription.module.scss';

export const PostForm = () => {
  const FORM_DATA = {
    descriptionTitle: '과제 설명',
    description: '과제 설명입니다...',
    attachmentTitle: '첨부파일',
    attachmentFileName: '첨부파일입니다... .pdf',
  };
  const handleOpenClick = () => {};
  const handleDownloadClick = () => {};

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{FORM_DATA.descriptionTitle}</h1>
        <div className={styles.divider}></div>
      </div>
      <p className={styles.description}>{FORM_DATA.description}</p>
      <div className={styles.attachment}>
        <h1 className={styles.attachmentTitle}>
          {FORM_DATA.attachmentTitle} <span className={styles.pdf}>(PDF)</span>
        </h1>
        <div className={styles.attachmentBox}>
          <span className={styles.fileName}>
            {FORM_DATA.attachmentFileName}
          </span>
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
