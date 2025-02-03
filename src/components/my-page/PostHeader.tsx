import styles from './postHeader.module.scss';
import arrowButton from '../../assets/icons/arrow-button.svg';
import { DeadlineLabel } from '../common/label/DeadlineLabel';

interface PostHeaderProps {
  tab: string;
  category: string;
  title: string;
  deadline: number;
  postImage?: string | null;
}

export const PostHeader = ({
  tab,
  category,
  title,
  deadline,
  postImage,
}: PostHeaderProps) => {
  return (
    <>
      <div className={styles.sectionWrapper}>
        <p className={styles.sectionTitle}>게시물 관리</p>
        <p className={styles.sectionCategory}>{tab}</p>
      </div>
      <div className={styles.postcardHeader}>
        {postImage ? (
          <img
            className={styles.imagePlaceholder}
            src={postImage}
            alt='게시글 사진'
          />
        ) : (
          <div className={styles.imagePlaceholder}></div>
        )}
        <div className={styles.postcardInfo}>
          <div className={styles.sectionCategory}>
            {tab} {'>'} {category}
          </div>
          <DeadlineLabel deadline={deadline} />
          <p className={styles.postTitle}>{title}</p>
        </div>
        <img
          src={arrowButton}
          alt='화살표 버튼'
          className={styles.arrowButton}></img>
      </div>
    </>
  );
};
