import styles from './postHeader.module.scss';
import arrowButton from '../../assets/icons/arrow-button.svg';
import { DeadlineLabel } from '../common/label/DeadlineLabel';

interface PostHeaderProps {
  category: string;
  title: string;
  deadline: number;
  postImage?: string;
}

export const PostHeader = ({
  category,
  title,
  deadline,
  postImage,
}: PostHeaderProps) => {
  return (
    <>
      <div className={styles.imageAndDetails}>
        <div className={styles.imageWrapper}>
          {postImage ? (
            <img
              className={styles.mainImage}
              src={postImage}
              alt='게시글 사진'
            />
          ) : (
            <div className={styles.mainImage}>대표사진</div>
          )}
        </div>
        <div className={styles.details}>
          <div className={styles.route}>
            {category} {'>'} 기획
          </div>
          <DeadlineLabel deadline={deadline} />
          <p className={styles.title}>{title}</p>
        </div>
        <img
          src={arrowButton}
          alt='화살표 버튼'
          className={styles.arrowButton}></img>
      </div>
    </>
  );
};
