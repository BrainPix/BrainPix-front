import { useParams, useLocation } from 'react-router-dom';
import styles from './postsIdeaMarket.module.scss';
import { PurchaseStatus } from '../../../components/my-page/PurchaseStatus';
import { IdeaMarketPostHeader } from '../../../components/my-page/IdeaMarketPostHeader';

export const PostsIdeaMarket = () => {
  const POST_DATA = [
    {
      id: 1,
      user: 'SEO YEON',
      title: '디자인 해드립니다',
      postImage: '',
      price: 200000000,
      ideaMarketAuth: 'ALL',
    },
  ];

  // 게시물 id 받아오기
  const { postId } = useParams<{ postId: string }>();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category') || '카테고리 없음';

  // POST_DATA에서 postId에 맞는 데이터 찾기
  const post = POST_DATA.find((post) => post.id === Number(postId));

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div className={styles.postcardWrapper}>
      <IdeaMarketPostHeader
        category={category}
        title={post.title}
        price={post.price}
      />
      <div className={styles.purchaseCardWrapper}>
        <PurchaseStatus />
      </div>
    </div>
  );
};
