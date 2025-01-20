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
        <table className={styles.purchaseTable}>
          <thead>
            <tr>
              <th>아이디</th>
              <th>거래 방식</th>
              <th>지불 금액</th>
              <th>액션</th>
            </tr>
          </thead>
          <tbody>
            {purchaseRecords.map((record) => (
              <tr key={record.id}>
                <td>{record.id}</td>
                <td>{record.paymentMethod}</td>
                <td>{record.amount.toLocaleString()}</td>
                <td>
                  <button className={styles.messageButton}>
                    메신저 보내기
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MyPageLayout>
  );
}

export default PostsIdeaMarket;
