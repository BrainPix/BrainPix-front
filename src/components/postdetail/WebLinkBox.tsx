import styles from './webLinkBox.module.scss';
import ShortcutArrow from '../../assets/icons/shortcut-arrow.svg';

const WebLinkBox = () => {
  return (
    <div className={styles.container}>
      <div className={styles.webLinkBox}>
        <span className={styles.webLinkText}>웹 링크</span>
      </div>
      <button className={styles.shortcutButton}>
        <img
          src={ShortcutArrow}
          alt='바로가기'
          className={styles.shortcutArrow}
        />
      </button>
    </div>
  );
};

export default WebLinkBox;
