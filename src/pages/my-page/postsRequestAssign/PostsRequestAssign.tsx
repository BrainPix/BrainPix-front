import { getPostRequestTaskDetail } from '../../../apis/postManagementAPI.ts';
import { RequestTaskDetail } from '../../../types/postDataType.ts';
import { CurrentPeople } from '../../../components/my-page/CurrentPeople.tsx';
import { ApplyStatus } from '../../../components/my-page/ApplyStatus.tsx';
import { PostHeader } from '../../../components/my-page/PostHeader.tsx';

import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export const PostsRequestAssign = () => {
  const { taskId } = useParams<{ taskId: string }>();

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery<RequestTaskDetail>({
    queryKey: ['requestTaskDetail', taskId],
    queryFn: () => getPostRequestTaskDetail(Number(taskId)),
    enabled: !!taskId,
    staleTime: 1000 * 60 * 10,
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !post) return <div>요청 과제 게시글을 찾을 수 없습니다.</div>;
  console.log('요청 과제 상세 조회 페이지 - taskId', taskId);
  return (
    <>
      <PostHeader
        tab={'요청 과제'}
        category={post.specialization}
        title={post.title}
        deadline={post.deadLine}
        postImage={post.thumbnailImageUrl}
        postId={Number(taskId)}
      />
      <ApplyStatus
        applicationStatus={post.applicationStatus}
        postType='request-task'
      />
      <CurrentPeople currentMembers={post.currentMembers} />
    </>
  );
};
