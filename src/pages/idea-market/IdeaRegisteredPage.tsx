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

export const IdeaRegisteredPage = () => {
  const { ideaId } = useParams<{ ideaId: string }>();

  const { data, isLoading, error } = useQuery<IdeaMarketDetail, Error>({
    queryKey: ['ideaMarketDetail', ideaId],
    queryFn: () => getIdeaMarketDetail(Number(ideaId)),
    enabled: !!ideaId,
    staleTime: 1000 * 60 * 5, // 5분
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>오류 발생!</div>;

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

  const parseJwt = (token: string) => {
    try {
      const base64Url = token.split('.')[1]; // JWT의 Payload
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Base64 URL Safe 복원
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
          .join(''),
      );
      return JSON.parse(jsonPayload); // JSON 객체로 변환
    } catch (e) {
      console.error('❌ 토큰 파싱 오류:', e);
      return null;
    }
  };
  //로컬스토리지에서 accessToken을 가져와 userId 가져오기
  const accessToken = localStorage.getItem('accessToken');
  const decodedToken = accessToken ? parseJwt(accessToken) : null;
  const userId = decodedToken?.userId || decodedToken?.id || null;
  console.log('내 userId:', userId);

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
        profileImageUrl={writerData.profileImageUrl}
        userId={userId}
      />
      <AuthorInfo {...writerData} />
    </div>
  );
};
