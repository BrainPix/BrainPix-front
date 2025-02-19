import { ProfileHeaderAuthor } from '../../../components/my-page/ProfileHeaderAuthor';
import PostTitleApply from '../../../components/registeredPage/PostTitleApply';
import AssignmentDescription from '../../../components/registeredPage/AssignmentDescription';
import RecruitInfo from '../../../components/registeredPage/RecruitInfo';
import QnASection from '../../../components/postdetail/QnASection';
import AuthorInfo from '../../../components/postdetail/AuthorInfo';
import styles from '../../../pages/request-assign/requestRegisteredPage.module.scss';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { RequestDetail } from '../../../types/detailPageType';
import { getRequestDetail } from '../../../apis/detailPageAPI';
import { getUserIdFromToken } from '../../../utils/auth';

export const RequestAssignEdit = () => {
  const { taskId } = useParams<{ taskId: string }>();
  const userId = getUserIdFromToken();
  const [resolvedTaskId, setResolvedTaskId] = useState<number | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (taskId) {
      setResolvedTaskId(Number(taskId));
      setIsReady(true);
    }
  }, [taskId]);

  const {
    data: post,
    isLoading,
    error,
  } = useQuery<RequestDetail, Error>({
    queryKey: ['RequestDetail', resolvedTaskId],
    queryFn: () => getRequestDetail(resolvedTaskId!),
    enabled: isReady,
    staleTime: 1000 * 60 * 10,
  });

  const postData = {
    taskId: Number(taskId),
    title: post?.title ?? '',
    category: post?.category ?? '',
    taskType: post?.taskType ?? '',
    auth: post?.auth ?? '',
    price: post?.price ?? 0,
    viewCount: post?.viewCount ?? 0,
    saveCount: post?.saveCount ?? 0,
    thumbnailImageUrl: post?.thumbnailImageUrl ?? '',
    createdDate: post?.createdDate ?? '',
    deadline: post?.deadline ?? 0,
    writerName: post?.writer?.name ?? '',
    recruitments: post?.recruitments ?? [],
    isSavedPost: post?.isSavedPost ?? false,
  };

  const writerData = {
    writerId: post?.writer?.writerId ?? 0,
    name: post?.writer?.name ?? '',
    profileImageUrl: post?.writer?.profileImageUrl ?? '',
    role: post?.writer?.role ?? '',
    specialization: post?.writer?.specialization ?? '',
    totalIdeas: post?.writer?.totalIdeas ?? 0,
    totalCollaborations: post?.writer?.totalCollaborations ?? 0,
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생!</div>;

  return (
    <>
      <div className={styles.margin}>
        <ProfileHeaderAuthor
          name={post?.writer?.name || ''}
          profileImageUrl={post?.writer?.profileImageUrl || ''}
          buttonPath='/request-assign'
          postId={Number(taskId)}
          postType='request-tasks'
        />
        <PostTitleApply {...postData} />
        <AssignmentDescription
          content={post?.content || ''}
          attachments={post?.attachments || []}
        />
        <RecruitInfo />
        <QnASection
          userId={userId}
          postId={Number(taskId)}
        />
        <AuthorInfo {...writerData} />
      </div>
    </>
  );
};
