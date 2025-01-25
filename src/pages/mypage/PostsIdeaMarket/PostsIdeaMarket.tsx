import './postsIdeaMarket.module.scss';

interface PurchaseRecord {
  id: string;
  paymentMethod: string;
  amount: number;
}

interface PostIdeaMarketProps {
  title: string;
  price: number;
  purchaseRecords: PurchaseRecord[];
}

function PostIdeaMarket({
  title,
  price,
  purchaseRecords,
}: PostIdeaMarketProps) {
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

export default PostIdeaMarket;
