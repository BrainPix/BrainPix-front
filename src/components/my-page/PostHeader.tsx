import { useNavigate } from 'react-router-dom';
import styles from './postHeader.module.scss';
import { DeadlineLabel } from '../common/label/DeadlineLabel';
import { calculateDday } from '../../utils/dateUtils';
import { Image } from '../common/image/Image';
import { getCategoryLabel } from '../../utils/categoryMapping.ts';

interface PostHeaderProps {
  tab: string;
  specialization: string;
  title: string;
  deadline?: string;
  postImage?: string | null;
  postId: number;
}

export const PostHeader = ({
  tab,
  specialization,
  title,
  deadline,
  postImage,
  postId,
}: PostHeaderProps) => {
  const navigate = useNavigate();
  const dDay = deadline ? calculateDday(deadline) : undefined;
  const FORMATTED_SPECIALIZATION = getCategoryLabel(specialization);

  const handleEditNavigate = () => {
    let editPath = '/';
    if (tab === '요청 과제') {
      editPath = `/my/posts/request-assign/registered/${postId}`;
    } else if (tab === '협업 광장') {
      editPath = `/my/posts/collaboration/registered/${postId}`;
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
          <Image
            className={styles.imagePlaceholder}
            src={postImage}
            alt='게시글 사진'
          />
        ) : (
          <div className={styles.imagePlaceholder}></div>
        )}
        <div className={styles.postcardInfo}>
          <div className={styles.postcardCategory}>
            {tab} {'>'} {FORMATTED_SPECIALIZATION}
          </div>
          <p className={styles.postTitle}>{title}</p>
          {dDay !== undefined && <DeadlineLabel deadline={dDay} />}
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
