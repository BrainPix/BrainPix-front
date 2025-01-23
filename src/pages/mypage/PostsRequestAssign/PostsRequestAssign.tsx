import styles from './postsRequestAssign.module.scss';
import MyPageLayout from '../../layout/MyPageLayout.tsx';

function PostsRequestAssign() {
  const mockPosts = [
    {
      id: 2,
      category: 'requestAssign',
      user: 'yeonyyy',
      title: 'Web 개발 부탁드립니다.',
      deadline: '21',
      purchaseRecords: [
        { id: 'serqe', paymentMethod: '카카오페이', amount: 1000 },
        { id: 'serqe', paymentMethod: '카카오페이', amount: 1000 },
      ],
    },
    // 추가 데이터...
  ];

  return (
    <MyPageLayout>
      <div className={styles.container}>
        {/* Header */}
        <div className={styles.header}>
          <h2>게시물 관리</h2>
          <p>요청 과제</p>
        </div>

        {/* Post Details */}
        <div className={styles.postDetails}>
          <div className={styles.thumbnail}></div>
          <div>
            <p>요청게시 &gt; 기획</p>
            <p>
              <span className={styles.status}>모집 마감 (D-21)</span>
            </p>
            <h3>Web 서비스 제안</h3>
          </div>
          <button className={styles.arrowButton}>→</button>
        </div>

        {/* 지원 현황 */}
        <div className={styles.section}>
          <h3>지원 현황</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>아이디</th>
                <th>역할</th>
                <th>현재 인원 / 모집 인원</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>serqe</td>
                <td>디자이너</td>
                <td>1 / 4</td>
                <td>
                  <button className={styles.acceptButton}>수락</button>
                  <button className={styles.rejectButton}>거절</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* 현재 인원 */}
        <div className={styles.section}>
          <h3>현재 인원</h3>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>아이디</th>
                <th>역할</th>
                <th>인원수</th>
                <th>관리</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>serqe</td>
                <td>디자이너</td>
                <td>1</td>
                <td>
                  <button className={styles.profileButton}>프로필</button>
                  <button className={styles.messageButton}>메신저</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </MyPageLayout>
  );
}

export default PostsRequestAssign;
