import styles from './webLinkBox.module.scss';
const WebLinkBox = () => {
  return (
    <div className={styles.container}>
      <div className={styles.webLinkBox}>
        <span className={styles.webLinkText}>웹 링크</span>
      </div>
    </div>
  );
};

export default WebLinkBox;
