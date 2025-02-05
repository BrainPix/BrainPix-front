import styles from './ideaDescription.module.scss';

interface IdeaDescriptionProps {
  content: string;
  attachments: string[];
}

const IdeaDescription = ({ content, attachments }: IdeaDescriptionProps) => {
  const handleOpenClick = (url: string) => {
    window.open(url, '_blank');
  };
  const handleDownloadClick = (url: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = url.split('/').pop() || 'attachment';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>아이디어 설명</h1>
        <div className={styles.divider}></div>
      </div>
      <p className={styles.description}>{content}</p>
      {attachments.length > 0 && (
        <div className={styles.attachment}>
          <h1 className={styles.attachmentTitle}>
            첨부파일 <span className={styles.pdf}>(PDF)</span>
          </h1>
          {attachments.map((url, index) => (
            <div
              key={index}
              className={styles.attachmentBox}>
              <span className={styles.fileName}>{url.split('/').pop()}</span>
              <div className={styles.actions}>
                <button
                  className={styles.open}
                  onClick={() => handleOpenClick(url)}>
                  열기
                </button>
                <span className={styles.separator}>|</span>
                <button
                  className={styles.download}
                  onClick={() => handleDownloadClick(url)}>
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

export default IdeaDescription;
