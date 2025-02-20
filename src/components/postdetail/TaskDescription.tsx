import styles from './taskDescription.module.scss';
import DOMPurify from 'dompurify';

interface TaskDescriptionProps {
  content: string;
  attachments: string[];
}

const TaskDescription = ({ content, attachments }: TaskDescriptionProps) => {
  const handleOpenClick = (fileUrl: string) => {
    window.open(fileUrl, '_blank');
  };

  const handleDownloadClick = (fileUrl: string) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileUrl.split('/').pop() || 'downloaded_file';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>협업 설명</h1>
        <div className={styles.divider}></div>
      </div>
      <p className={styles.description}>
        {DOMPurify.sanitize(content, { ALLOWED_TAGS: [] })}
      </p>
      {attachments.length > 0 && (
        <div className={styles.attachment}>
          <h1 className={styles.attachmentTitle}>
            첨부파일 <span className={styles.pdf}>(PDF)</span>
          </h1>
          {attachments.map((fileUrl, index) => (
            <div
              key={index}
              className={styles.attachmentBox}>
              <span className={styles.fileName}>
                {fileUrl.split('/').pop()}
              </span>
              <div className={styles.actions}>
                <button
                  className={styles.open}
                  onClick={() => handleOpenClick(fileUrl)}>
                  열기
                </button>
                <span className={styles.separator}>|</span>
                <button
                  className={styles.download}
                  onClick={() => handleDownloadClick(fileUrl)}>
                  다운로드
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskDescription;
