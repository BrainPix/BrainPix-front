import { useNavigate } from 'react-router-dom';
import styles from './postHeader.module.scss';
import { DeadlineLabel } from '../common/label/DeadlineLabel';

interface PostHeaderProps {
  tab: string;
  category: string;
  title: string;
  deadline: number;
  postImage?: string | null;
  postId: number;
}

export const PostHeader = ({
  tab,
  category,
  title,
  deadline,
  postImage,
  postId,
}: PostHeaderProps) => {
  const navigate = useNavigate();

  const handleEditNavigate = () => {
    let editPath = '/';
    if (tab === '요청과제') {
      editPath = `/my/posts/request-assign/edit/${postId}`;
    } else if (tab === '협업 광장') {
      editPath = `/my/posts/collaboration/edit/${postId}`;
    }

    navigate(editPath);
  };
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
          <div className={styles.postcardCategory}>
            {tab} {'>'} {category}
          </div>
          <p className={styles.postTitle}>{title}</p>
          <DeadlineLabel deadline={deadline} />
        </div>
        <div className={styles.buttonContainer}>
          <button
            className={styles.arrowButton}
            onClick={handleEditNavigate}
          />
        </div>
      </div>
    </>
  );
};
