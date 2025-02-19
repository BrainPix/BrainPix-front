import styles from './webLinkBox.module.scss';
import { imageErrorHandler } from '../../utils/imageErrorHandler';

interface WebLinkBoxProps {
  link?: string;
  thumbnailImageUrl?: string;
}

const WebLinkBox = ({ link, thumbnailImageUrl }: WebLinkBoxProps) => {
  if (!link) return null;

  return (
    <div
      className={styles.container}
      onClick={() => window.open(link, '_blank', 'noopener noreferrer')}>
      <img
        src={thumbnailImageUrl}
        alt='웹 링크 썸네일'
        className={styles.thumbnail}
        onError={imageErrorHandler}
      />
      <div className={styles.webLinkBox}>
        <span className={styles.webLinkText}>웹 링크</span>
      </div>
    </div>
  );
};

export default WebLinkBox;
