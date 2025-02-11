import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getPostIdeaMarket } from '../../../apis/postManagementAPI.ts';
import styles from './myPagePosts.module.scss';
import { TabNavigation } from '../../../components/my-page/TabNavigation.tsx';
import { PostCard } from '../../../components/postcard/PostCard.tsx';
import { Post } from '../../../types/postDataType.ts';

export const MyPagePosts = () => {
  const TABS = ['아이디어 마켓', '요청과제', '협업광장'];
  const [activeTab, setActiveTab] = useState(TABS[0]);

  // const categoryMap: { [key: string]: PostCategories } = {
  //   [TABS[0]]: PostCategories.IDEA_MARKET,
  //   [TABS[1]]: PostCategories.REQUEST_ASSIGN,
  //   [TABS[2]]: PostCategories.COLLABORATION,
  // };

  const { data, isLoading, isError } = useQuery({
    queryKey: ['myPosts', activeTab],
    queryFn: () => getPostIdeaMarket(0, 10),
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
  });

  // const posts = [
  //   {
  //     id: 1,
  //     category: PostCategories.IDEA_MARKET,
  //     user: 'yeonyyy',
  //     profileImage: null,
  //     title: '노인층을 위한 키오스크 대체 로봇',
  //     postImage: null,
  //     price: 500000,
  //   },
  //   {
  //     id: 2,
  //     category: PostCategories.REQUEST_ASSIGN,
  //     user: 'yeonyyy',
  //     profileImage: null,
  //     title: 'Web 개발 부탁드립니다.',
  //     postImage: null,
  //     deadline: 20,
  //   },
  //   {
  //     id: 3,
  //     category: PostCategories.COLLABORATION,
  //     user: 'yeonyyy',
  //     profileImage: null,
  //     title: '제목 입니다.',
  //     postImage: '/image3.png',
  //     deadline: 20,
  //     current: 0,
  //     total: 5,
  //   },
  //   {
  //     id: 4,
  //     category: PostCategories.IDEA_MARKET,
  //     user: 'yeonyyy',
  //     profileImage: '/image1.png',
  //     title: '테스트!!',
  //     postImage: null,
  //     deadline: 20,
  //     current: 0,
  //     total: 5,
  //     saveCount: 17,
  //     viewCount: 25,
  //   },
  //   {
  //     id: 5,
  //     category: PostCategories.IDEA_MARKET,
  //     user: 'yeonyyy',
  //     profileImage: '/image1234.png',
  //     title: '안뇽',
  //     postImage: null,
  //     deadline: 17,
  //     saveCount: 17,
  //     viewCount: 25,
  //   },
  // ];

  // const filteredPosts = posts.filter(
  //   (post) => post.category === categoryMap[activeTab],
  // );

  return (
    <div className={styles.container}>
      <div className={styles.postListWrapper}>
        <div className={styles.title}>게시물 관리</div>
        <TabNavigation
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {isLoading ? (
          <p>로딩 중...</p>
        ) : isError ? (
          <p>데이터를 불러오는 중 오류가 발생했습니다.</p>
        ) : (
          <>
            <div className={styles.count}>총 게시글 {data?.content.length}</div>
            {/* 게시물 리스트 */}
            <div className={styles.postList}>
              {data?.content.map((post: Post) => (
                <PostCard
                  key={post.id}
                  {...post}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
