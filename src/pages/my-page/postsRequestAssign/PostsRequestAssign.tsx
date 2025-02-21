import { getPostRequestTaskDetail } from '../../../apis/postManagementAPI.ts';
import { RequestTaskDetail } from '../../../types/postDataType.ts';
import { CurrentPeople } from '../../../components/my-page/CurrentPeople.tsx';
import { ApplyStatus } from '../../../components/my-page/ApplyStatus.tsx';
import { PostHeader } from '../../../components/my-page/PostHeader.tsx';

import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import LoadingPage from '../../loading/LoadingPage.tsx';
import { ErrorPage } from '../../errorPage/ErrorPage.tsx';

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

  if (isLoading) return <LoadingPage />;
  if (isError || !post) return <ErrorPage />;

  return (
    <>
      <PostHeader
        tab={'요청 과제'}
        specialization={post.specialization}
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
