import styles from '../postdetail/taskDescription.module.scss';

interface PostFormContentProps {
  descriptionTitle: string;
  description?: string;
  attachmentTitle: string;
  attachmentFileName: string;
}

export const PostFormContent = ({
  descriptionTitle,
  description,
  attachmentTitle,
  attachmentFileName,
}: PostFormContentProps) => {
  const handleOpenClick = () => {};
  const handleDownloadClick = () => {};

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>{descriptionTitle}</h1>
        <div className={styles.divider}></div>
      </div>
      <p className={styles.description}>{description}</p>
      <div className={styles.attachment}>
        <h1 className={styles.attachmentTitle}>
          {attachmentTitle} <span className={styles.pdf}>(PDF)</span>
        </h1>
        <div className={styles.attachmentBox}>
          <span className={styles.fileName}>{attachmentFileName}</span>
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
