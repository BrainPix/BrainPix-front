import styles from './ideaMarketPostHeader.module.scss';
import arrowButton from '../../assets/icons/arrow-button.svg';

interface PostHeaderProps {
  category: string;
  title: string;
  price: number;
}

export const IdeaMarketPostHeader = ({
  category,
  title,
  price,
}: PostHeaderProps) => {
  const FORMATTEDPRICE = price.toLocaleString();

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
        <img
          src={arrowButton}
          alt='화살표 버튼'
          className={styles.arrowButton}></img>
      </div>
    </>
  );
};
