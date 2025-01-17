import { useState } from 'react';
import styles from './myPagePosts.module.scss';
import classNames from 'classnames';
import { Header } from '../../../components/header/Header.tsx';
import MyPageSidebar from '../../../components/sidebar/MyPageSidebar.tsx';
import PostCard from '../../../components/postcard/PostCard.tsx';

const TABS = ['아이디어 마켓', '요청과제', '협업광장'];

/*
interface PostCardProps {
  category: 'ideaMarket' | 'requestTask' | 'collaboration';
  user: string;
  title: string;
  image?: string;
  price?: string;
  deadline?: string;
  memberInfo?: string;
}
*/

const MyPagePosts = () => {
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
    // 게시물 데이터 추가
  ];

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.contentWrapper}>
        <MyPageSidebar />

        <main className={styles.mainContent}>
          <h1 className={styles.title}>
            게시물 관리 <span className={styles.count}>11</span>
          </h1>

          {/* 탭 네비게이션 */}
          <div className={styles.tabs}>
            {TABS.map((tab) => (
              <div
                key={tab}
                className={classNames(styles.tabItem, {
                  [styles.activeTab]: activeTab === tab,
                })}
                onClick={() => setActiveTab(tab)}>
                {tab}
              </div>
            ))}
          </div>

          {/* 게시물 리스트 */}
          <div className={styles.postList}>
            {posts
              .filter(
                (post) =>
                  (activeTab === '아이디어 마켓' &&
                    post.category === 'ideaMarket') ||
                  (activeTab === '요청과제' &&
                    post.category === 'requestTask') ||
                  (activeTab === '협업광장' &&
                    post.category === 'collaboration'),
              )
              .map((post) => (
                <PostCard
                  key={post.id}
                  {...post}
                />
              ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyPagePosts;
