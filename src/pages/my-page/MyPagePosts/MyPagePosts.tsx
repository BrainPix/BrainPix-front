import { useState } from 'react';
import styles from './MyPagePosts.module.scss';
import classNames from 'classnames';
import { Header } from '../../../components/header/Header.tsx';

const MyPagePosts = () => {
  const [activeTab, setActiveTab] = useState('아이디어 마켓');

  const posts = [
    {
      id: 1,
      user: 'yeonyyy',
      title: '노인층을 위한 키오스크 대체 로봇',
      price: '500,000원',
      thumbnail: '', // 이미지 URL (추후 추가 가능)
    },
    // 추가 게시물 데이터
  ];

  return (
    <div className={styles.container}>
      <Header />
      {/* 왼쪽 사이드바 */}
      <aside className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>마이페이지</h2>
        <nav className={styles.nav}>
          <div className={styles.navItem}>포트폴리오</div>
          <div className={classNames(styles.navItem, styles.active)}>
            게시물 관리
          </div>
          <div className={styles.navItem}>BrainPIX 지원 현황</div>
          <div className={styles.navItem}>메신저</div>
          <div className={styles.navItem}>저장</div>
        </nav>
      </aside>

      {/* 메인 콘텐츠 */}
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
  );
};

export default MyPagePosts;
