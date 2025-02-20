import styles from './postsIdeaMarket.module.scss';
import { PurchaseStatus } from '../../../components/my-page/PurchaseStatus';
import { IdeaMarketPostHeader } from '../../../components/my-page/IdeaMarketPostHeader';

import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPostIdeaMarketDetail } from '../../../apis/postManagementAPI.ts';
import { IdeaMarketDetail } from '../../../types/postDataType.ts';

export const PostsIdeaMarket = () => {
  const { ideaId } = useParams<{ ideaId: string }>();

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery<IdeaMarketDetail>({
    queryKey: ['ideaMarketDetail', ideaId],
    queryFn: () => getPostIdeaMarketDetail(Number(ideaId)),
    enabled: !!ideaId,
    staleTime: 1000 * 60 * 10,
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !post) return <div>게시글을 찾을 수 없습니다.</div>;

  return (
    <div className={styles.postcardWrapper}>
      <IdeaMarketPostHeader
        tab={'아이디어 마켓'}
        specialization={post.specialization}
        title={post.title}
        price={post.price}
        ideaId={Number(ideaId)}
      />
      <PurchaseStatus purchaseHistory={post.purchaseHistory} />
    </div>
  );
};
