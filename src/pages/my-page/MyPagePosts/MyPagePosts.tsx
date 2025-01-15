import { useState } from 'react';
import styles from './MyPagePosts.module.scss';
import classNames from 'classnames';
import { Header } from '../../../components/header/Header.tsx';
import MyPageSidebar from '../../../components/sidebar/MyPageSidebar.tsx';
import PostCard from '../../../components/postcard/PostCard.tsx';

const MyPagePosts = () => {
  const [activeTab, setActiveTab] = useState('아이디어 마켓');

  const posts = [
    {
      id: 1,
      user: 'yeonyyy',
      title: '노인층을 위한 키오스크 대체 로봇',
      price: '500,000원',
      thumbnail: '', // 이미지 URL
    },
    // 추가 게시물 데이터
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
            {['아이디어 마켓', '요청과제', '협업광장'].map((tab) => (
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
            {posts.map((post) => (
              <div
                key={post.id}
                className={styles.postCard}>
                <div className={styles.thumbnail}></div>
                <div className={styles.postInfo}>
                  <span className={styles.user}>{post.user}</span>
                  <p className={styles.title}>{post.title}</p>
                  <span className={styles.price}>{post.price}</span>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyPagePosts;
