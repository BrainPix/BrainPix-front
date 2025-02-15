import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getIdeaMarketDetail } from '../../../apis/detailPageAPI';
import { IdeaMarketDetail } from '../../../types/detailPageType';
import { PostFormAuthor } from '../../../components/my-page/PostFormAuthor';
import { PostFormIdeaTitle } from '../../../components/my-page/PostFormIdeaTitle';
import { PostFormContent } from '../../../components/my-page/PostFormContent';
import QnASection from '../../../components/postdetail/QnASection';
import AuthorInfo from '../../../components/postdetail/AuthorInfo';

export const IdeaMarketEdit = () => {
  const FORM_DATA = {
    descriptionTitle: '아이디어 설명',
    description: '아이디어 설명입니다롱',
    attachmentTitle: '첨부파일',
    attachmentFileName: '첨부파일 제목 입니다... .pdf',
  };
  // const post = {
  //   postId: 2,
  //   userName: 'SEO YEON',
  //   profileImage: null,
  // };

  const { ideaId } = useParams<{ ideaId: string }>();
  console.log('IdeaMarketEdit.tsx - URL Params ideaId:', ideaId);
  const {
    data: post,
    isLoading,
    isError,
  } = useQuery<IdeaMarketDetail, Error>({
    queryKey: ['ideaMarketDetail', ideaId],
    queryFn: () => getIdeaMarketDetail(Number(ideaId)),
    enabled: !!ideaId,
    staleTime: 1000 * 60 * 5,
  });
  //console.log('IdeaMarketEdit.tsx - post:', post);
  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !post) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <div>
      {/* 게시물 작성자, 게시물 정보 */}
      <PostFormAuthor
        userName={post?.writer?.name || ''}
        profileImage={post?.writer?.profileImageUrl || ''}
      />
      {/* 게시물 제목, 게시물 정보 */}
      <PostFormIdeaTitle
        title={post?.title || ''}
        category={post?.category || ''}
        //ideaMarketType={post?.ideaMarketType || ''}
        //auth={post?.auth || ''}
        price={post?.price || 0}
        viewCount={post?.viewCount || 0}
        saveCount={post?.saveCount || 0}
        thumbnailImageUrl={post?.thumbnailImageUrl || ''}
        createdDate={post?.createdDate || ''}
      />
      {/* 과제 설명, 첨부파일 */}
      <PostFormContent
        descriptionTitle={FORM_DATA.descriptionTitle}
        description={FORM_DATA.description}
        attachmentTitle={FORM_DATA.attachmentTitle}
        attachmentFileName={FORM_DATA.attachmentFileName}
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
  );
};
