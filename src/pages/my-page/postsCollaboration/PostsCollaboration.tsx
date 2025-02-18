import { PostHeader } from '../../../components/my-page/PostHeader.tsx';
import { ApplyStatus } from '../../../components/my-page/ApplyStatus.tsx';
import { CurrentPeople } from '../../../components/my-page/CurrentPeople.tsx';

import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPostCollaborationDetail } from '../../../apis/postManagementAPI.ts';
import { CollaborationDetail } from '../../../types/postDataType.ts';

export const PostsCollaboration = () => {
  const { collaborationId } = useParams<{ collaborationId: string }>();

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery<CollaborationDetail>({
    queryKey: ['collaborationDetail', collaborationId],
    queryFn: () => getPostCollaborationDetail(Number(collaborationId)),
    enabled: !!collaborationId,
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
        postId={Number(collaborationId)}
      />
      <ApplyStatus
        applicationStatus={post.applicationStatus}
        postType='collaboration'
      />
      <CurrentPeople currentMembers={post.currentMembers} />
    </>
  );
};
