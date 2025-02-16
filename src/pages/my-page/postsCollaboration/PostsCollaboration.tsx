import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPostCollaborationDetail } from '../../../apis/postManagementAPI.ts';
import { CollaborationDetail } from '../../../types/postDataType.ts';
import { PostHeader } from '../../../components/my-page/PostHeader.tsx';
import { ApplyStatus } from '../../../components/my-page/ApplyStatus.tsx';
import { CurrentPeople } from '../../../components/my-page/CurrentPeople.tsx';

export const PostsCollaboration = () => {
  // const POST_DATA = [
  //   {
  //     id: 3,
  //     tab: '협업 광장',
  //     category: '디자인',
  //     postImage: null,
  //     title: '디자인 해드립니다',
  //     deadline: 16,
  //   },
  // ];

  const { postId } = useParams<{ postId: string }>();

  // POST_DATA에서 postId에 맞는 데이터 찾기
  // const post = POST_DATA.find((p) => p.id === Number(postId));
  // if (!post) {
  //   return <div>게시글을 찾을 수 없습니다.</div>;
  // }

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery<CollaborationDetail>({
    queryKey: ['collaborationDetail', postId],
    queryFn: () => getPostCollaborationDetail(Number(postId)),
    enabled: !!postId, // postId가 있을 때만 실행
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !post) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <>
      <PostHeader
        tab={'협업 광장'}
        category={post.specialization}
        title={post.title}
        deadline={post.deadLine}
        postImage={post.thumbnailImageUrl}
        postId={post.ideaId}
      />
      <ApplyStatus
        applicationStatus={post.applicationStatus}
        postType='collaboration'
      />
      <CurrentPeople currentMembers={post.currentMembers} />
    </>
  );
};
