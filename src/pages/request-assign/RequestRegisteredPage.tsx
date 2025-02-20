import ProfileHeader from '../../components/registeredPage/ProfileHeader';
import PostTitleApply from '../../components/registeredPage/PostTitleApply';
import AssignmentDescription from '../../components/registeredPage/AssignmentDescription';
import RecruitInfo from '../../components/registeredPage/RecruitInfo';
import QnASection from '../../components/postdetail/QnASection';
import AuthorInfo from '../../components/postdetail/AuthorInfo';
import styles from './requestRegisteredPage.module.scss';
import { useParams } from 'react-router-dom';

import { useQuery } from '@tanstack/react-query';
import { RequestDetail } from '../../types/detailPageType';
import { getRequestDetail } from '../../apis/detailPageAPI';
import { getUserIdFromToken } from '../../utils/auth';
import LoadingPage from '../loading/LoadingPage';
import { ErrorPage } from '../errorPage/ErrorPage';
import { Join } from '../join/Join';

export const RequestRegisteredPage = () => {
  const { taskId } = useParams<{ taskId: string }>();

  const { data, isLoading, error } = useQuery<RequestDetail, Error>({
    queryKey: ['requestDetail', taskId],
    queryFn: () => getRequestDetail(Number(taskId)),
    enabled: !!taskId,
    staleTime: 1000 * 60 * 5, // 5분
  });

  if (isLoading) return <LoadingPage />;
  if (!data) return <Join />;
  if (error) return <ErrorPage />;

  if (!data) return null;

  const postData = {
    thumbnailImageUrl: data.thumbnailImageUrl ?? '',
    category: data.category ?? '',
    taskType: data.taskType ?? '',
    deadline: data.deadline ?? 0,
    auth: data.auth ?? '',
    title: data.title ?? '',
    price: data.price ?? 0,
    viewCount: data.viewCount ?? 0,
    saveCount: data.saveCount ?? 0,
    createdDate: data.createdDate ?? '',
    writerName: data.writer?.name ?? '',
    taskId: Number(taskId),
    isSavedPost: data.isSavedPost ?? false,
  };

  const writerData = {
    writerId: data.writer?.writerId ?? 0,
    name: data.writer?.name ?? '',
    profileImageUrl: data.writer?.profileImageUrl ?? '',
    role: data.writer?.role ?? '',
    specialization: data.writer?.specialization ?? '',
    totalIdeas: data.writer?.totalIdeas ?? 0,
    totalCollaborations: data.writer?.totalCollaborations ?? 0,
  };

  const descriptionData = {
    content: data.content ?? '',
    attachments: data.attachments ?? [],
  };

  const userId = getUserIdFromToken();

  return (
    <div className={styles.margin}>
      <ProfileHeader {...writerData} />
      <PostTitleApply
        {...postData}
        recruitments={data.recruitments}
      />
      <AssignmentDescription
        content={descriptionData.content}
        attachments={descriptionData.attachments}
      />
      <RecruitInfo recruitments={data.recruitments} />
      <QnASection
        postId={Number(taskId)}
        userId={userId}
      />
      <AuthorInfo {...writerData} />
    </div>
  );
};
