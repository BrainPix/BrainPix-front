import { useParams } from 'react-router-dom';
import styles from './postsIdeaMarket.module.scss';
import { PurchaseStatus } from '../../../components/my-page/PurchaseStatus';
import { IdeaMarketPostHeader } from '../../../components/my-page/IdeaMarketPostHeader';

export const PostsIdeaMarket = () => {
  const FORM_DATA = {
    tab: '아이디어 마켓',
    category: '디자인',
  };
  const POST_DATA = [
    {
      id: 1,
      user: 'SEO YEON',
      title: '디자인 해드립니다',
      postImage: '',
      price: 200000,
      ideaMarketAuth: 'ALL',
    },
  ];

  // 게시물 id 받아오기
  const { postId } = useParams<{ postId: string }>();

  // POST_DATA에서 postId에 맞는 데이터 찾기
  const post = POST_DATA.find((post) => post.id === Number(postId));

  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div className={styles.postcardWrapper}>
      <IdeaMarketPostHeader
        tab={FORM_DATA.tab}
        category={FORM_DATA.category}
        title={post.title}
        price={post.price}
        postId={post.id}
      />

      <div className={styles.tableContainer}>
        <div className={styles.tableTitle}>구매 현황</div>
        <div className={styles.titleDivider}/>
      </div>
      <div className={styles.purchaseCardWrapper}>
        <PurchaseStatus />
      </div>
    </div>
  );
};
