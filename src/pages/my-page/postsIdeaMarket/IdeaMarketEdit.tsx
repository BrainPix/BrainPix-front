import { ProfileHeaderAuthor } from '../../../components/my-page/ProfileHeaderAuthor';
import PostTitlePay from '../../../components/registeredPage/PostTitlePay';
import IdeaDescription from '../../../components/registeredPage/IdeaDescription';
import QnASection from '../../../components/postdetail/QnASection';
import AuthorInfo from '../../../components/postdetail/AuthorInfo';
import styles from '../../../pages/idea-market/IdeaRegisteredPage.module.scss';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getIdeaMarketDetail } from '../../../apis/detailPageAPI';
import { IdeaMarketDetail } from '../../../types/detailPageType';

export const IdeaMarketEdit = () => {
  // const FORM_DATA = {
  //   descriptionTitle: '아이디어 설명',
  //   description: '아이디어 설명입니다롱',
  //   attachmentTitle: '첨부파일',
  //   attachmentFileName: '첨부파일 제목 입니다... .pdf',
  // };
  // const post = {
  //   postId: 2,
  //   userName: 'SEO YEON',
  //   profileImage: null,
  // };

  const { ideaId } = useParams<{ ideaId: string }>();
  const [resolvedIdeaId, setResolvedIdeaId] = useState<number | null>(null);
  const [isReady, setIsReady] = useState(false);
  console.log('IdeaMarketEdit.tsx - URL Params ideaId:', ideaId);

  // ideaId가 존재할 때만 resolvedIdeaId를 설정하고 렌더링 진행
  // 새로고침 시 ideaId가 존재하지 않아 렌더링이 중단되는 것을 방지
  useEffect(() => {
    if (ideaId) {
      console.log('useEffect - ideaId 업데이트됨:', ideaId);
      setResolvedIdeaId(Number(ideaId));
      setIsReady(true); // 데이터 준비 완료
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

  console.log('IdeaMarketEdit.tsx - post:', post);

  if (!isReady) return <div>페이지 로딩 중...</div>;
  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !post) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <>
      <div className={styles.margin}>
        {/* 게시물 작성자, 게시물 정보 */}
        <ProfileHeaderAuthor
          name={post?.writer?.name || ''}
          profileImageUrl={post?.writer?.profileImageUrl || ''}
          buttonPath='/idea-market'
          postId={post?.ideaId}
          postType='idea-markets'
        />
        {/* 게시물 제목, 게시물 정보 */}
        <PostTitlePay
          title={post?.title || ''}
          category={post?.category || ''}
          ideaMarketType={post?.ideaMarketType || ''}
          auth={post?.auth || ''}
          price={post?.price || 0}
          viewCount={post?.viewCount || 0}
          saveCount={post?.saveCount || 0}
          thumbnailImageUrl={post?.thumbnailImageUrl || ''}
          createdDate={post?.createdDate || ''}
        />
        {/* 과제 설명, 첨부파일 */}
        <IdeaDescription
          content={post?.content || ''}
          attachments={post?.attachments || []}
        />
        {/* 담당자 Q&A */}
        <QnASection />
        {/* 작성자 정보 */}
        <AuthorInfo
          name={post?.writer?.name || ''}
          profileImageUrl={post?.writer?.profileImageUrl || ''}
          role={post?.writer?.role || ''}
          specialization={post?.writer?.specialization || ''}
          totalIdeas={post?.writer?.totalIdeas || 0}
          totalCollaborations={post?.writer?.totalCollaborations || 0}
        />
      </div>
    </>
  );
};
