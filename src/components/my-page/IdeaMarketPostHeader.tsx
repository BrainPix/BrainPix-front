import { useNavigate } from 'react-router-dom';
import styles from './ideaMarketPostHeader.module.scss';

interface PostHeaderProps {
  category: string;
  title: string;
  price: number;
  postId: number;
}

export const IdeaMarketPostHeader = ({
  category,
  title,
  price,
  postId,
}: PostHeaderProps) => {
  const navigate = useNavigate();
  const FORMATTEDPRICE = price.toLocaleString();

  const handleEditNavigate = () => {
    if (postId) {
      navigate(`/my/posts/idea-market/edit/${postId}`);
    } else {
      navigate('/my/posts//idea-market');
    }
  };

  return (
    <>
      <div className={styles.sectionWrapper}>
        <div className={styles.sectionTitle}>게시물 관리</div>
        <div className={styles.sectionCateogry}>{category}</div>
      </div>
      <div className={styles.postcardHeader}>
        <div className={styles.imagePlaceholder}>이미지</div>
        <div className={styles.postcardInfo}>
          <div className={styles.postCardCategory}>아이디어 마켓 &gt;</div>
          <p>{title}</p>
          <h2>{FORMATTEDPRICE} 원</h2>
        </div>
        <button
          className={styles.arrowButton}
          onClick={handleEditNavigate}
        />
      </div>
    </>
  );
};
