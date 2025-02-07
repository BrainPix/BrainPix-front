import { useParams } from 'react-router-dom';
import { CurrentPeople } from '../../../components/my-page/CurrentPeople.tsx';
import { ApplyStatus } from '../../../components/my-page/ApplyStatus.tsx';
import { PostHeader } from '../../../components/my-page/PostHeader.tsx';

export const PostsRequestAssign = () => {
  const POST_DATA = [
    {
      id: 2,
      tab: '요청과제',
      category: '기획',
      postImage: null,
      title: '디자인 해드립니다',
      deadline: 16,
    },
  ];

  const { postId } = useParams<{ postId: string }>();

  // POST_DATA에서 postId에 맞는 데이터 찾기
  const post = POST_DATA.find((p) => p.id === Number(postId));
  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <>
      <PostHeader
        tab={post.tab}
        category={post.category}
        title={post.title}
        deadline={post.deadline}
        postImage={post.postImage}
        postId={post.id}
      />
      <ApplyStatus />
      <CurrentPeople />
    </>
  );
};
