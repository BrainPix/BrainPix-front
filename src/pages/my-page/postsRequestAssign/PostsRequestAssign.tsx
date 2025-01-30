import styles from './postsRequestAssign.module.scss';
import { CurrentPeople } from '../../../components/my-page/CurrentPeople.tsx';
import { ApplyStatus } from '../../../components/my-page/ApplyStatus.tsx';
import { useParams } from 'react-router-dom';

export const PostsRequestAssign = () => {
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

  const { postId } = useParams<{ postId: string }>();
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const category = queryParams.get('category') || '카테고리 없음';

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
      <ApplyStatus />
      <CurrentPeople />
    </div>
  );
};
