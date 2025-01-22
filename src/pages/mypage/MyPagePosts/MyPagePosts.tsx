import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './myPagePosts.module.scss';
import MyPageLayout from '../../layout/MyPageLayout.tsx';
import PostCard from '../../../components/postcard/PostCard.tsx';
import TabNavigation from '../../../components/tab-navigation/TabNavigation.tsx';

const TABS = ['아이디어 마켓', '요청과제', '협업광장'];

const MyPagePosts = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const posts = [
    {
      id: 1,
      category: 'ideaMarket',
      user: 'yeonyyy',
      title: '노인층을 위한 키오스크 대체 로봇',
      image: '',
      price: '500,000원',
    },
    {
      id: 2,
      category: 'requestTask',
      user: 'yeonyyy',
      title: 'Web 개발 부탁드립니다.',
      deadline: '20',
    },
    {
      id: 3,
      category: 'collaboration',
      user: 'yeonyyy',
      title: '제목 입니다.',
      image: '/image3.png',
      deadline: '20',
      memberInfo: 'Member (현재인원)/(모집인원)',
    },
    {
      id: 4,
      category: 'ideaMarket',
      user: 'yeonyyy',
      title: '테스트!!',
      image: '/image3.png',
      deadline: '20',
      memberInfo: 'Member (현재인원)/(모집인원)',
    },
    {
      id: 5,
      category: 'ideaMarket',
      user: 'yeonyyy',
      title: '안뇽',
      image: '/image3.png',
      deadline: '20',
      memberInfo: 'Member (현재인원)/(모집인원)',
    },
    // 게시물 데이터 추가
  ];

  return (
    <MyPageLayout>
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
        {posts
          .filter(
            (post) =>
              (activeTab === '아이디어 마켓' &&
                post.category === 'ideaMarket') ||
              (activeTab === '요청과제' && post.category === 'requestTask') ||
              (activeTab === '협업광장' && post.category === 'collaboration'),
          )
          .map((post) => (
            <div
              key={post.id}
              className={styles.clickablePost}
              onClick={() =>
                navigate(`/posts-idea-market/${post.id}?category=${activeTab}`)
              }>
              <PostCard {...post} />
            </div>
          ))}
      </div>
    </MyPageLayout>
  );
};

export default MyPagePosts;
