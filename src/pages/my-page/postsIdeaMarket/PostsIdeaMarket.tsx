import { useParams, useLocation } from 'react-router-dom';
import styles from './postsIdeaMarket.module.scss';
import arrowButton from '../../../assets/icons/arrow-button.svg';

export const PostsIdeaMarket = () => {
  const POST_DATA = [
    {
      id: 1,
      user: 'SEO YEON',
      title: '디자인 해드립니다',
      postImage: '',
      price: 200000000,
      ideaMarketAuth: 'ALL',
    },
  ];
  const PURCHASE_RECORDS = [
    { id: 'serqe', paymentMethod: '카카오페이', amount: 1000 },
    { id: 'serqe', paymentMethod: '카카오페이', amount: 1000 },
  ];

  // 게시물 id 받아오기
  const { postId } = useParams<{ postId: string }>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category') || '카테고리 없음';
  // POST_DATA에서 postId에 맞는 데이터 찾기
  const post = POST_DATA.find((post) => post.id === Number(postId));

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  const { title, price } = post;

  return (
    <div className={styles.postcardWrapper}>
      <div className={styles.sectionWrapper}>
        <div className={styles.sectionTitle}>게시물 관리</div>
        <div className={styles.sectionCateogry}>{category}</div>
      </div>
      <div className={styles.postcardHeader}>
        <div className={styles.imagePlaceholder}>이미지</div>
        <div className={styles.postcardInfo}>
          <div className={styles.postCardCategory}>아이디어 마켓 &gt;</div>
          <p>{title}</p>
          <h2>{price} 원</h2>
        </div>
        <img
          src={arrowButton}
          alt='화살표 버튼'
          className={styles.arrowButton}></img>
      </div>
      <div className={styles.purchaseCardWrapper}>
        <h2>구매 현황</h2>
        <div className={styles.cardHeader}>
          <span>아이디</span>
          <span>거래 방식</span>
          <span>지불 금액</span>
        </div>
        {PURCHASE_RECORDS.map((record) => (
          <div
            key={record.id}
            className={styles.purchaseCard}>
            <div className={styles.cardDetails}>
              <div>{record.id}</div>
              <div>{record.paymentMethod}</div>
              <div>{record.amount}</div>
            </div>
            <div className={styles.cardActions}>
              <button className={styles.messageButton}>메신저 보내기</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
