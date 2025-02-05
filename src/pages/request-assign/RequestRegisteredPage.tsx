import ProfileHeader from '../../components/registeredPage/ProfileHeader';
import PostTitleApply from '../../components/registeredPage/PostTitleApply';
import AssignmentDescription from '../../components/registeredPage/AssignmentDescription';
import QnASection from '../../components/postdetail/QnASection';
import AuthorInfo from '../../components/postdetail/AuthorInfo';
import styles from './requestRegisteredPage.module.scss';

import { useParams } from 'react-router-dom';
import { useRequestDetail } from '../../constants/useDetailPage';

export const RequestRegisteredPage = () => {
  const { ideaId } = useParams<{ ideaId: string }>();
  const validIdeaId = ideaId ? Number(ideaId) : undefined;

  const { data, isLoading, error } = useRequestDetail(validIdeaId as number);

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
