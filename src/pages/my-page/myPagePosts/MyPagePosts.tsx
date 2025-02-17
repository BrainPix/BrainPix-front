import styles from './myPagePosts.module.scss';
import { TabNavigation } from '../../../components/my-page/TabNavigation.tsx';
import PreviewThumbnail from '../../../components/preview/PreviewThumbnail.tsx';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  IdeaMarket,
  RequestTask,
  Collaboration,
  PostApiResponse,
} from '../../../types/postDataType.ts';
import {
  getPostIdeaMarket,
  getPostRequestTask,
  getPostCollaboration,
} from '../../../apis/postManagementAPI.ts';

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
    staleTime: 1000 * 60 * 10,
  });

  const posts = data?.content ?? [];

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
            <div className={styles.postList}>
              {posts.map((post) => (
                <PreviewThumbnail
                  key={post.ideaId}
                  data={{
                    ideaId: post.ideaId,
                    imageUrl:
                      'thumbnailImageUrl' in post &&
                      post.thumbnailImageUrl !== null
                        ? post.thumbnailImageUrl
                        : undefined,
                    profileImage: undefined,
                    username: post.writerName,
                    description: post.title,
                    price: 'price' in post ? post.price : undefined,
                    isBookmarked: false,
                    auth: 'ALL',
                    category: '',
                    saves: 0,
                    views: 0,
                    verified: true,
                    onClick: () => {
                      if (activeTab === TABS[0]) {
                        navigate(`/my/posts/idea-market/${post.ideaId}`);
                      }
                      if (activeTab === TABS[1]) {
                        navigate(`/my/posts/request-assign/${post.ideaId}`);
                      }
                      if (activeTab === TABS[2]) {
                        navigate(`/my/posts/collaboration/${post.ideaId}`);
                      }
                    },
                    onBookmarkClick: () =>
                      console.log(`Bookmark clicked for ${post.ideaId}`),
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
