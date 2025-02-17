import ProfileHeader from '../../components/postdetail/ProfileHeader';
import PostHeader from '../../components/postdetail/PostHeader';
import WebLinkBox from '../../components/postdetail/WebLinkBox';
import TaskDescription from '../../components/postdetail/TaskDescription';
import RecruitmentInfo from '../../components/postdetail/RecruitmentInfo';
import RecruitmentStatus from '../../components/postdetail/RecruitmentStatus';
import TeamBuildingButton from '../../components/postdetail/TeamBuildingButton';
import QnASection from '../../components/postdetail/QnASection';
import AuthorInfo from '../../components/postdetail/AuthorInfo';
import styles from './postDetailWithLink.module.scss';

import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getCollaborationDetail } from '../../apis/detailPageAPI';
import { CollaborationDetail } from '../../types/detailPageType';
import { getUserIdFromToken } from '../../utils/auth';

export const PostDetailWithLink = () => {
  const { collaborationId } = useParams<{ collaborationId: string }>();

  const { data, isLoading, error } = useQuery<CollaborationDetail, Error>({
    queryKey: ['collaborationDetail', collaborationId],
    queryFn: () => getCollaborationDetail(Number(collaborationId)),
    enabled: !!collaborationId,
    staleTime: 1000 * 60 * 5, // 5분
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생!</div>;
  if (!data) return null;

  const profileData = {
    writerId: data.writer.writerId,
    name: data.writer.name,
    profileImageUrl: data.writer.profileImageUrl,
    role: data.writer.role,
  };

  const postHeaderData = {
    category: data.category,
    auth: data.auth,
    title: data.title,
    deadline: Number(data.deadline),
    viewCount: data.viewCount,
    saveCount: data.saveCount,
    createdDate: data.createdDate,
  };

  const webLinkData = data.link
    ? { link: data.link, thumbnailImageUrl: data.thumbnailImageUrl }
    : null;

  const taskDescriptionData = {
    content: data.content,
    attachments: data.attachments,
  };

  const recruitmentInfoData = {
    recruitments:
      data.recruitments?.map((r) => ({
        recruitmentId: r.recruitmentId,
        domain: r.domain,
        occupiedQuantity: r.occupiedQuantity,
        totalQuantity: r.totalQuantity,
      })) || [],
  };

  const recruitmentStatusData = {
    members: data.openMembers.map((m) => ({
      userId: m.userId,
      name: m.name,
      domain: m.domain,
      openMyProfile: m.openMyProfile,
    })),
  };

  const authorInfoData = {
    name: data.writer.name,
    profileImageUrl: data.writer.profileImageUrl,
    role: data.writer.role,
    specialization: data.writer.specialization,
    totalIdeas: data.writer.totalIdeas,
    totalCollaborations: data.writer.totalCollaborations,
  };

  const userId = getUserIdFromToken();

  return (
    <>
      <div className={styles.margin}>
        <ProfileHeader {...profileData} />
        <PostHeader {...postHeaderData} />
        {webLinkData && <WebLinkBox {...webLinkData} />}
        <TaskDescription {...taskDescriptionData} />
        <RecruitmentInfo {...recruitmentInfoData} />
        <RecruitmentStatus {...recruitmentStatusData} />
      </div>
      <div className={styles.buttonMargin}>
        <TeamBuildingButton
          recruitments={recruitmentInfoData.recruitments}
          category={postHeaderData.category}
          writerName={profileData.name}
          title={postHeaderData.title}
          collaborationId={Number(collaborationId)}
        />
      </div>
      <div className={styles.margin}>
        <QnASection
          postId={Number(collaborationId)}
          profileImageUrl={authorInfoData.profileImageUrl}
          userId={userId}
        />
        <AuthorInfo {...authorInfoData} />
      </div>
    </>
  );
};
