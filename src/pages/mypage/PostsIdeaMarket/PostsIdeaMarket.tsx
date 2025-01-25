import { useParams, useLocation } from 'react-router-dom';
import styles from './postsIdeaMarket.module.scss';
import MyPageLayout from '../../layout/MyPageLayout.tsx';
import arrowButton from '../../../assets/icons/arrow-button.svg';

const mockPosts = [
  // 게시물 데이터 예시
  {
    id: '1',
    nickname: 'SEO YEON',
    title: '디자인 해드립니다',
    profileImage: '',
    price: 200000000,
    ideaMarketAuth: 'ALL',
    imageURL: '',
    purchaseRecords: [
      { id: 'serqe', paymentMethod: '카카오페이', amount: 1000 },
      { id: 'serqe', paymentMethod: '카카오페이', amount: 1000 },
    ],
  },
  // 추가 데이터...
];

function PostsIdeaMarket() {
  const { postId } = useParams<{ postId: string }>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category') || '카테고리 없음';
  //console.log(category);

  // mock 데이터에서 postId에 맞는 데이터 찾기
  const post = mockPosts.find((p) => p.id === postId);

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  const { nickname, title, price, purchaseRecords } = post;

  return (
    <MyPageLayout>
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
            <h2>{price.toLocaleString()} 원</h2>
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
          {purchaseRecords.map((record) => (
            <div
              key={record.id}
              className={styles.purchaseCard}>
              <div className={styles.cardDetails}>
                <div>{record.id}</div>
                <div>{record.paymentMethod}</div>
                <div>{record.amount.toLocaleString()}</div>
              </div>
              <div className={styles.cardActions}>
                <button className={styles.messageButton}>메신저 보내기</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MyPageLayout>
  );
}

export default PostsIdeaMarket;
