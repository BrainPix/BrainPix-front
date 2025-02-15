import { useNavigate } from 'react-router-dom';
import styles from './ideaMarketPostHeader.module.scss';

interface PostHeaderProps {
  tab: string;
  category: string;
  title: string;
  price: number;
  ideaId: number;
}

export const IdeaMarketPostHeader = ({
  tab,
  category,
  title,
  price,
  ideaId,
}: PostHeaderProps) => {
  const navigate = useNavigate();
  const FORMATTEDPRICE = price.toLocaleString();

  const handleEditNavigate = () => {
    if (ideaId) {
      navigate(`/my/posts/idea-market/registered/${ideaId}`);
    } else {
      alert('아이디어 마켓 게시물 정보를 불러올 수 없습니다.');
    }
  };

  return (
    <>
      <div className={styles.sectionWrapper}>
        <div className={styles.sectionTitle}>게시물 관리</div>
        <div className={styles.sectionCateogry}>{tab}</div>
      </div>
      <div className={styles.postcardHeader}>
        <div className={styles.imagePlaceholder} />
        <div className={styles.postcardInfo}>
          <div className={styles.postCardCategory}>
            {tab} &gt; {category}
          </div>
          <div className={styles.postCardTitle}>{title}</div>
          <div className={styles.price}>{FORMATTEDPRICE} 원</div>
        </div>
        <div className={styles.ButtonContainer}>
          <button
            className={styles.arrowButton}
            onClick={handleEditNavigate}
          />
        </div>
      </div>
    </>
  );
};
