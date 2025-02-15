import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPostIdeaMarketDetail } from '../../../apis/postManagementAPI.ts';
import { IdeaMarketDetail } from '../../../types/postDataType.ts';
import styles from './postsIdeaMarket.module.scss';
import { PurchaseStatus } from '../../../components/my-page/PurchaseStatus';
import { IdeaMarketPostHeader } from '../../../components/my-page/IdeaMarketPostHeader';

export const PostsIdeaMarket = () => {
  // const FORM_DATA = {
  //   tab: '아이디어 마켓',
  //   category: '디자인',
  // };
  // const POST_DATA = [
  //   {
  //     id: 1,
  //     user: 'SEO YEON',
  //     title: '디자인 해드립니다',
  //     postImage: '',
  //     price: 200000,
  //     ideaMarketAuth: 'ALL',
  //   },
  // ];

  // 게시물 id 받아오기
  const { ideaId } = useParams<{ ideaId: string }>();
  //console.log('ideaId', ideaId);
  // POST_DATA에서 postId에 맞는 데이터 찾기
  // const post = POST_DATA.find((post) => post.id === Number(postId));

  // if (!post) {
  //   return <div>게시글을 찾을 수 없습니다.</div>;
  // }

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery<IdeaMarketDetail>({
    queryKey: ['ideaMarketDetail', ideaId],
    queryFn: () => getPostIdeaMarketDetail(Number(ideaId)),
    enabled: !!ideaId, // postId가 있을 때만 실행
  });
  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !post) return <div>게시글을 찾을 수 없습니다.</div>;
  console.log('아이디어 마켓 상세 조회 페이지 - ideaId', ideaId);
  return (
    <div className={styles.postcardWrapper}>
      <IdeaMarketPostHeader
        tab={'아이디어 마켓'}
        category={post.specialization}
        title={post.title}
        price={post.price}
        ideaId={Number(ideaId)}
      />
      <PurchaseStatus purchaseHistory={post.purchaseHistory} />
    </div>
  );
};
