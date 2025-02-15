import styles from './postFormIdeaTitle.module.scss';
import CorporatePublicLabel from '../../components/common/label/Label.tsx';
//import BookmarkIcon from '../../assets/icons/bookmarkFill.svg?react';
//import EmptyCircleIcon from '../../assets/icons/emptyCircle.svg?react';

interface PostFormIdeaTitleProps {
  category: string;
  title: string;
  price: number;
  createdDate: string;
  viewCount: number;
  saveCount: number;
  thumbnailImageUrl: string | null;
}

export const PostFormIdeaTitle = ({
  category,
  title,
  price,
  createdDate,
  viewCount,
  saveCount,
  thumbnailImageUrl,
}: PostFormIdeaTitleProps) => {
  // const POST_DATA = {
  //   tab: '아이디어 마켓',
  //   category: '디자인',
  //   mainImage: null,
  //   title: '디자인 해드립니다',
  //   price: 2000000,
  //   date: '2024/12/28',
  //   viewCount: 120,
  //   saveCount: 12,
  //   deadline: 21,
  // };

  //const [isBookmarked, setIsBookmarked] = useState(false);

  // const toggleBookmark = () => {
  //   setIsBookmarked(!isBookmarked);
  // };

  const FORMATTEDPRICE = price.toLocaleString();

  return (
    <div>
      <div className={styles.imageAndDetails}>
        <div className={styles.imageWrapper}>
          {thumbnailImageUrl ? (
            <img
              className={styles.mainImage}
              src={thumbnailImageUrl}
              alt='대표사진'
            />
          ) : (
            <div className={styles.mainImage} />
          )}
        </div>
        <div className={styles.details}>
          <div className={styles.route}>
            {'아이디어 마켓'} {'>'} {category}
          </div>
          <div className={styles.titleAndLabel}>
            <p className={styles.title}>{title}</p>
            <CorporatePublicLabel
              text='기업 공개'
              type='corporatePublic'
            />
          </div>
          <div className={styles.price}>{FORMATTEDPRICE}원</div>
          <p className={styles.date}>
            {createdDate} · 조회 {viewCount} · 저장 {saveCount}
          </p>
          <button className={styles.applyButton}>구매하기</button>
        </div>
      </div>
    </div>
  );
};
