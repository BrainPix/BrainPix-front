import { ProfileHeaderAuthor } from '../../../components/my-page/ProfileHeaderAuthor';
import PostTitlePay from '../../../components/registeredPage/PostTitlePay';
import IdeaDescription from '../../../components/registeredPage/IdeaDescription';
import QnASection from '../../../components/postdetail/QnASection';
import AuthorInfo from '../../../components/postdetail/AuthorInfo';
import styles from '../../../pages/idea-market/ideaRegisteredPage.module.scss';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getIdeaMarketDetail } from '../../../apis/detailPageAPI';
import { IdeaMarketDetail } from '../../../types/detailPageType';
import { getUserIdFromToken } from '../../../utils/auth';

export const IdeaMarketEdit = () => {
  const { ideaId } = useParams<{ ideaId: string }>();
  const userId = getUserIdFromToken();
  const [resolvedIdeaId, setResolvedIdeaId] = useState<number | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (ideaId) {
      setResolvedIdeaId(Number(ideaId));
      setIsReady(true);
    }
  }, [ideaId]);

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery<IdeaMarketDetail, Error>({
    queryKey: ['ideaMarketDetail', resolvedIdeaId],
    queryFn: () => getIdeaMarketDetail(resolvedIdeaId!),
    enabled: isReady,
    staleTime: 1000 * 60 * 10,
  });

  const postData = {
    ideaId: Number(ideaId),
    title: post?.title ?? '',
    category: post?.category ?? '',
    ideaMarketType: post?.ideaMarketType ?? '',
    auth: post?.auth ?? '',
    price: post?.price ?? 0,
    viewCount: post?.viewCount ?? 0,
    saveCount: post?.saveCount ?? 0,
    thumbnailImageUrl: post?.thumbnailImageUrl ?? '',
    createdDate: post?.createdDate ?? '',
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

  if (!isReady) return <div>페이지 로딩 중...</div>;
  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !post) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <>
      <div className={styles.margin}>
        <ProfileHeaderAuthor
          name={post?.writer?.name || ''}
          profileImageUrl={post?.writer?.profileImageUrl || ''}
          buttonPath='/idea-market'
          postId={post?.ideaId}
          postType='idea-markets'
        />
        <PostTitlePay {...postData} />
        <IdeaDescription
          content={post?.content || ''}
          attachments={post?.attachments || []}
        />
        <QnASection
          userId={userId}
          postId={Number(ideaId)}
        />
        <AuthorInfo {...writerData} />
      </div>
    </>
  );
};
