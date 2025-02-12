import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  getPostIdeaMarket,
  getPostRequestTask,
  getPostCollaboration,
} from '../../../apis/postManagementAPI.ts';
import styles from './myPagePosts.module.scss';
import { TabNavigation } from '../../../components/my-page/TabNavigation.tsx';
import PreviewThumbnail from '../../../components/preview/PreviewThumbnail.tsx';
import {
  IdeaMarket,
  RequestTask,
  Collaboration,
  PostApiResponse,
} from '../../../types/postDataType.ts';

export const MyPagePosts = () => {
  const navigate = useNavigate();

  const TABS = ['아이디어 마켓', '요청 과제', '협업 광장'];
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const postAPIMap = () => {
    if (activeTab === TABS[0]) return getPostIdeaMarket;
    if (activeTab === TABS[1]) return getPostRequestTask;
    if (activeTab === TABS[2]) return getPostCollaboration;
    return getPostIdeaMarket;
  };

  const { data, isLoading, isError } = useQuery<
    PostApiResponse<IdeaMarket | RequestTask | Collaboration>
  >({
    queryKey: ['myPosts', activeTab],
    queryFn: () => postAPIMap()(0, 10),
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
  });

  const posts = data?.content ?? [];

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
            <div className={styles.count}>총 게시글 {posts.length}</div>
            {/* 게시물 리스트 */}
            <div className={styles.postList}>
              {posts.map((post) => (
                <PreviewThumbnail
                  key={post.ideaId}
                  imageUrl={
                    'thumbnailImageUrl' in post &&
                    post.thumbnailImageUrl !== null
                      ? post.thumbnailImageUrl
                      : undefined
                  }
                  //profileImage={profileImage || ''}
                  description={post.title}
                  username={post.writerName}
                  price={'price' in post ? post.price : undefined}
                  isBookmarked={false} // 북마크 여부는 추후 API 연동 필요
                  onBookmarkClick={() =>
                    console.log(`Bookmark clicked for ${post.ideaId}`)
                  }
                  verified={true} // 검증 여부 (필요시 데이터에서 가져오기)
                  onClick={() => {
                    if (activeTab === TABS[0]) {
                      navigate(`/my/posts/idea-market/${post.ideaId}`);
                    }
                    if (activeTab === TABS[1]) {
                      navigate(`/my/posts/request-assign/${post.ideaId}`);
                    }
                    if (activeTab === TABS[2]) {
                      navigate(`/my/posts/collaboration/${post.ideaId}`);
                    }
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
