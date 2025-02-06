import { useState } from 'react';
import styles from './postFormIdeaTitle.module.scss';
import CorporatePublicLabel from '../../components/common/label/Label.tsx';
//import BookmarkIcon from '../../assets/icons/bookmarkFill.svg?react';
//import EmptyCircleIcon from '../../assets/icons/emptyCircle.svg?react';

export const PostFormIdeaTitle = () => {
  const POST_DATA = {
    tab: '아이디어 마켓',
    category: '디자인',
    mainImage: null,
    title: '디자인 해드립니다',
    price: 2000000,
    date: '2024/12/28',
    viewCount: 120,
    saveCount: 12,
    deadline: 21,
  };

  //const [isBookmarked, setIsBookmarked] = useState(false);

  // const toggleBookmark = () => {
  //   setIsBookmarked(!isBookmarked);
  // };
  
  const FORMATTEDPRICE = POST_DATA.price.toLocaleString();

  return (
    <div>
      <div className={styles.imageAndDetails}>
        <div className={styles.imageWrapper}>
          {POST_DATA.mainImage ? (
            <img
              className={styles.mainImage}
              src={POST_DATA.mainImage}
              alt='대표사진'
            />
          ) : (
            <div className={styles.mainImage}/>
          )}
        </div>
        <div className={styles.details}>
          <div className={styles.route}>
            {POST_DATA.tab} {'>'} {POST_DATA.category}
          </div>
          <div className={styles.titleAndLabel}>
            <p className={styles.title}>{POST_DATA.title}</p>
            <CorporatePublicLabel
              text='기업 공개'
              type='corporatePublic'
            />
          </div>
          <div className={styles.price}>{FORMATTEDPRICE}원</div>
          <p className={styles.date}>
            {POST_DATA.date} · 조회 {POST_DATA.viewCount} · 저장{' '}
            {POST_DATA.saveCount}
          </p>
          <button className={styles.applyButton}>구매하기</button>
        </div>
      </div>
    </div>
  );
};
