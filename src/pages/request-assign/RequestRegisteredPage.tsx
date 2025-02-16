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

export const RequestRegisteredPage = () => {
  const { taskId } = useParams<{ taskId: string }>();
  //const validIdeaId = ideaId ? Number(taskId) : undefined;

  const { data, isLoading, error } = useQuery<RequestDetail, Error>({
    queryKey: ['requsetDetaill', taskId],
    queryFn: () => getRequestDetail(Number(taskId)),
    enabled: !!taskId,
    staleTime: 1000 * 60 * 5, //5분
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생!</div>;
  return (
    <>
      <div className={styles.margin}>
        <ProfileHeader
          name={data?.writer?.name || ''}
          profileImageUrl={data?.writer?.profileImageUrl || ''}
          openMyProfile={() => console.log('프로필 페이지로 이동')} // 임시 지정
        />
        <PostTitleApply
          thumbnailImageUrl={data?.thumbnailImageUrl || ''}
          category={data?.category || ''}
          taskType={data?.taskType || ''}
          deadline={data?.deadline || 0}
          auth={data?.auth || ''}
          title={data?.title || ''}
          price={data?.price || 0}
          viewCount={data?.viewCount || 0}
          saveCount={data?.saveCount || 0}
          createdDate={data?.createdDate || ''}
        />
        <AssignmentDescription
          content={data?.content || ''}
          attachments={data?.attachments || []}
        />
        <RecruitInfo />
        <QnASection />
        <AuthorInfo
          name={data?.writer?.name || ''}
          profileImageUrl={data?.writer?.profileImageUrl || ' '}
          role={data?.writer?.role || ''}
          specialization={data?.writer?.specialization || ' '}
          totalIdeas={data?.writer?.totalIdeas || 0}
          totalCollaborations={data?.writer?.totalCollaborations || 0}
        />
      </div>
    </>
  );
};
