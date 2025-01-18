import { useParams } from 'react-router-dom';
import './postsIdeaMarket.module.scss';

// interface PurchaseRecord {
//   id: string;
//   paymentMethod: string;
//   amount: number;
// }

const mockPosts = [
  {
    id: '1',
    title: '노인층을 위한 키오스크 대체 로봇',
    price: 500000,
    purchaseRecords: [
      { id: 'user1', paymentMethod: '카드', amount: 250000 },
      { id: 'user2', paymentMethod: '현금', amount: 250000 },
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
    <div className='postcard-details'>
      <div className='postcard-header'>
        <div className='image-placeholder'>이미지</div>
        <div className='postcard-info'>
          <h1>{title}</h1>
          <p>{price.toLocaleString()} 원</p>
        </div>
      </div>

      <h2>구매 현황</h2>
      <table className='purchase-table'>
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
                <button className='message-button'>메시지 보내기</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className='postcard-actions'>
        <button className='edit-button'>수정하기</button>
        <button className='delete-button'>삭제</button>
      </div>
    </div>
  );
}

export default PostsIdeaMarket;
