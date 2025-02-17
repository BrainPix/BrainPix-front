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

  console.log('RequestAssignEdit.tsx - URL Params taskId:', taskId);

  useEffect(() => {
    if (taskId) {
      console.log('useEffect - taskId 업데이트됨:', taskId);
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

  console.log('RequestAssignEdit.tsx - post:', post);

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
        {/* 게시물 작성자, 게시물 정보 */}
        <ProfileHeaderAuthor
          name={post?.writer?.name || ''}
          profileImageUrl={post?.writer?.profileImageUrl || ''}
          buttonPath='/request-assign'
          postId={Number(taskId)}
          postType='request-tasks'
        />
        <PostTitleApply {...postData} />

        {/* 과제 설명, 첨부파일 */}
        <AssignmentDescription
          content={post?.content || ''}
          attachments={post?.attachments || []}
        />

        {/* 모집 정보 */}
        <RecruitInfo />

        {/* 담당자 Q&A */}
        <QnASection
          userId={userId}
          postId={Number(taskId)}
          profileImageUrl={post?.writer?.profileImageUrl || ''}
        />

        {/* 작성자 정보 */}
        <AuthorInfo {...writerData} />
      </div>
    </>
  );
};
