import ProfileHeader from '../../components/registeredPage/ProfileHeader';
import PostTitlePay from '../../components/registeredPage/PostTitlePay';
import IdeaDescription from '../../components/registeredPage/IdeaDescription';
import QnASection from '../../components/postdetail/QnASection';
import AuthorInfo from '../../components/postdetail/AuthorInfo';
import styles from './ideaRegisteredPage.module.scss';

import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getIdeaMarketDetail } from '../../apis/detailPageAPI';
import { IdeaMarketDetail } from '../../types/detailPageType';
import { getUserIdFromToken } from '../../utils/auth';
import LoadingPage from '../loading/LoadingPage';
import { ErrorPage } from '../errorPage/ErrorPage';
import { Join } from '../join/Join';

export const IdeaRegisteredPage = () => {
  const { ideaId } = useParams<{ ideaId: string }>();

  const { data, isLoading, error } = useQuery<IdeaMarketDetail, Error>({
    queryKey: ['ideaMarketDetail', ideaId],
    queryFn: () => getIdeaMarketDetail(Number(ideaId)),
    enabled: !!ideaId,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) return <LoadingPage />;
  if (!data) return <Join />;
  if (error) return <ErrorPage />;

  if (!data) return null;

  const postData = {
    thumbnailImageUrl: data.thumbnailImageUrl ?? '',
    category: data.category ?? '',
    ideaMarketType: data.ideaMarketType ?? '',
    auth: data.auth ?? '',
    title: data.title ?? '',
    price: data.price ?? 0,
    viewCount: data.viewCount ?? 0,
    saveCount: data.saveCount ?? 0,
    createdDate: data.createdDate ?? '',
    ideaId: data.ideaId ?? 0,
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
      <PostTitlePay {...postData} />
      <IdeaDescription
        content={descriptionData.content}
        attachments={descriptionData.attachments}
      />
      <QnASection
        postId={Number(ideaId)}
        userId={userId}
      />
      <AuthorInfo {...writerData} />
    </div>
  );
};
