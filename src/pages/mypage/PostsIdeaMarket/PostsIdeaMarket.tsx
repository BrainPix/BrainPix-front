import { useParams } from 'react-router-dom';
import styles from './postsIdeaMarket.module.scss';
import MyPageLayout from '../../layout/MyPageLayout.tsx';

const mockPosts = [
  {
    id: '1',
    authorId: 'user1',
    title: '디자인 해드립니다',
    price: 200000000,
    purchaseRecords: [
      { id: 'serqe', paymentMethod: '카카오페이', amount: 1000 },
      { id: 'serqe', paymentMethod: '카카오페이', amount: 1000 },
    ],
  },
  // 추가 데이터...
];

function PostsIdeaMarket() {
  const { postId } = useParams<{ postId: string }>();

  // mock 데이터에서 postId에 맞는 데이터 찾기
  const post = mockPosts.find((p) => p.id === postId);

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  const { title, price, purchaseRecords } = post;

  return (
    <MyPageLayout>
      <div className={styles.postcardDetails}>
        <div className={styles.postcardHeader}>
          <div className={styles.imagePlaceholder}>이미지</div>
          <div className={styles.postcardInfo}>
            <h1>{title}</h1>
            <p>{price.toLocaleString()} 원</p>
          </div>
        </div>
        <h2>구매 현황</h2>
        <div className={styles.purchaseCardWrapper}>
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
