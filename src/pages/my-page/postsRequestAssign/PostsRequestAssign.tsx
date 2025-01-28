import styles from './postsRequestAssign.module.scss';
import { PostRecord } from '../../../components/post-record/PostRecord.tsx';
import { useLocation, useParams } from 'react-router-dom';

const POST_DATA = [
  {
    id: 2,
    tab: '요청과제',
    category: '기획',
    postImage: null,
    title: 'Web 서비스 제안',
    deadline: 21,
  },
];

const APPLY = [
  {
    id: 'serqe',
    role: '디자이너',
    current: 1,
    total: 4,
  },
];

const CURRENT_MEMBERS = [
  {
    id: 'serqe',
    role: '디자이너',
    current: 1,
  },
];

export const PostsRequestAssign = () => {
  const { postId } = useParams<{ postId: string }>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category') || '카테고리 없음';

  // POST_DATA에서 postId에 맞는 데이터 찾기
  const post = POST_DATA.find((p) => p.id === Number(postId));
  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2>게시물 관리</h2>
        <p>요청 과제</p>
      </div>

      <PostRecord
        title='지원 현황'
        columns={[
          { key: 'id', label: '아이디' },
          { key: 'role', label: '역할' },
          { key: 'currentTotal', label: '현재 인원 / 모집 인원' },
        ]}
        records={APPLY}
        actions={[
          {
            label: '수락',
            onClick: (record) => console.log(`수락: ${record.id}`),
          },
          {
            label: '거절',
            onClick: (record) => console.log(`거절: ${record.id}`),
          },
        ]}
      />

      <PostRecord
        title='현재 인원'
        columns={[
          { key: 'id', label: '아이디' },
          { key: 'role', label: '역할' },
          { key: 'current', label: '현재 인원' },
        ]}
        records={CURRENT_MEMBERS}
      />
    </div>
  );
};
