import styles from '../myPagePosts/myPagePosts.module.scss';
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
  getSavedIdeaMarkets,
  getSavedRequestTasks,
  getSavedCollaborationHubs,
} from '../../../apis/savePostsAPI.ts';
import { useBookmark } from '../../../hooks/useBookmark.ts';
import LoadingPage from '../../loading/LoadingPage.tsx';
import { ErrorPage } from '../../errorPage/ErrorPage.tsx';

export const SavedPosts = () => {
  const navigate = useNavigate();

  const TABS = ['아이디어 마켓', '요청 과제', '협업 광장'];
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const { bookmarkedPosts, toggleBookmark } = useBookmark();

  const postAPIMap = () => {
    if (activeTab === TABS[0]) return getSavedIdeaMarkets;
    if (activeTab === TABS[1]) return getSavedRequestTasks;
    if (activeTab === TABS[2]) return getSavedCollaborationHubs;
    return getSavedIdeaMarkets;
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
        <div className={styles.title}>저장된 게시물</div>
        <TabNavigation
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {isLoading ? (
          <LoadingPage />
        ) : isError ? (
          <ErrorPage />
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
                    isBookmarked: bookmarkedPosts.has(post.ideaId),
                    auth: 'ALL',
                    category: '',
                    saves: 0,
                    views: 0,
                    verified: true,
                    onClick: () => {
                      if (activeTab === TABS[0]) {
                        navigate(`/idea-market/registered/${post.ideaId}`);
                      }
                      if (activeTab === TABS[1]) {
                        navigate(`/request-assign/registered/${post.ideaId}`);
                      }
                      if (activeTab === TABS[2]) {
                        navigate(`/collaboration/registered/${post.ideaId}`);
                      }
                    },
                    onBookmarkClick: (e) => {
                      e.stopPropagation();
                      toggleBookmark(post.ideaId);
                    },
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
