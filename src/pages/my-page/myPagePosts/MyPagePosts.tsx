import { useState } from 'react';
import styles from './myPagePosts.module.scss';
import { PostCard } from '../../../components/postcard/PostCard.tsx';
import { TabNavigation } from '../../../components/my/TabNavigation.tsx';
import { PostProps, PostCategories } from '../../../types/postData.ts';

export const MyPagePosts = () => {
  const TABS = ['아이디어 마켓', '요청과제', '협업광장'];
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const POSTS: PostProps[] = [
    {
      id: 1,
      category: PostCategories.IDEA_MARKET,
      user: 'yeonyyy',
      title: '노인층을 위한 키오스크 대체 로봇',
      image: null,
      price: 500000,
    },
    {
      id: 2,
      category: PostCategories.REQUEST_ASSIGN,
      user: 'yeonyyy',
      title: 'Web 개발 부탁드립니다.',
      image: null,
      deadline: 20,
    },
    {
      id: 3,
      category: PostCategories.COLLABORATION,
      user: 'yeonyyy',
      title: '제목 입니다.',
      image: '/image3.png',
      deadline: 20,
      current: 0,
      total: 5,
    },
    {
      id: 4,
      category: PostCategories.IDEA_MARKET,
      user: 'yeonyyy',
      title: '테스트!!',
      image: '/image3.png',
      deadline: 20,
      current: 0,
      total: 5,
      saveCount: 17,
      viewCount: 25,
    },
    {
      id: 5,
      category: PostCategories.IDEA_MARKET,
      user: 'yeonyyy',
      title: '안뇽',
      image: '/image3.png',
      deadline: 17,
      saveCount: 17,
      viewCount: 25,
    },
  ];

  return (
    <div>
      <h1 className={styles.title}>
        게시물 관리 <span className={styles.count}>11</span>
      </h1>

      <TabNavigation
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* 게시물 리스트 */}
      <div className={styles.postList}>
        {POSTS.filter(
          (post) =>
            (activeTab === '아이디어 마켓' && post.category === 'ideaMarket') ||
            (activeTab === '요청과제' && post.category === 'requestAssign') ||
            (activeTab === '협업광장' && post.category === 'collaboration'),
        ).map((post) => (
          <PostCard
            key={post.id}
            {...post}
          />
        ))}
      </div>
    </div>
  );
};
