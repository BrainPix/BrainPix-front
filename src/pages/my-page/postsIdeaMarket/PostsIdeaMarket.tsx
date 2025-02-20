import styles from './postsIdeaMarket.module.scss';
import { PurchaseStatus } from '../../../components/my-page/PurchaseStatus';
import { IdeaMarketPostHeader } from '../../../components/my-page/IdeaMarketPostHeader';

import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { getPostIdeaMarketDetail } from '../../../apis/postManagementAPI.ts';
import { IdeaMarketDetail } from '../../../types/postDataType.ts';
import LoadingPage from '../../loading/LoadingPage.tsx';
import { ErrorPage } from '../../errorPage/ErrorPage.tsx';

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

  if (isLoading) return <LoadingPage />;
  if (isError || !post) return <ErrorPage />;

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
