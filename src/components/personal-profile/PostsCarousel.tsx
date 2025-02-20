import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { Carousel } from '../common/carousel/Carousel';
import styles from './postCarousel.module.scss';
import { getOtherPostsType } from '../../types/postDataType';
import { getOtherProfilePosts } from '../../apis/profileAPI';
import PreviewThumbnail from '../preview/PreviewThumbnail';

export const PostsCarousel = () => {
  const { id } = useParams();

  const [clickedPage, setClickedPage] = useState(0);
  const [currentData, setCurrentData] = useState<getOtherPostsType[][]>([]);

  const { data: posts } = useQuery({
    queryKey: ['posts', clickedPage],
    queryFn: () => getOtherProfilePosts(clickedPage, Number(id)),
  });

  useEffect(() => {
    if (!posts) return;

    if (!currentData.length) {
      const dataArray = new Array(posts?.totalPages).fill([]);
      dataArray[0] = posts.content;
      return setCurrentData(dataArray);
    }
    const updatedData = currentData.map((value, idx) => {
      return idx === clickedPage ? posts.content : value;
    });
    setCurrentData(updatedData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedPage, posts]);

  const handleClickNextButton = () => {
    setClickedPage((prev) => prev + 1);
  };

  const handleClickPreviousButton = () => {
    setClickedPage((prev) => prev + 1);
  };

  return (
    <div className={classNames(styles.container)}>
      <Carousel
        cardWidth={165}
        cardCount={4}
        gap={46.67}
        onClickNext={handleClickNextButton}
        onClickPrevious={handleClickPreviousButton}
        dataLength={posts?.totalElements}
        label='게시글'
        buttonPosition='top'>
        {currentData.map((posts, pageIdx) => (
          <React.Fragment key={pageIdx}>
            {posts.map(
              ({
                postId,
                title,
                thumbnailImage,
                openScope,
                specialization,
                writerImageUrl,
                writerName,
                savedCount,
                viewCount,
              }: getOtherPostsType) => (
                <PreviewThumbnail
                  key={postId}
                  data={{
                    ideaId: postId,
                    imageUrl: thumbnailImage,
                    description: title,
                    profileImage: writerImageUrl,
                    username: writerName,
                    saves: savedCount,
                    views: viewCount,
                    category: specialization,
                    auth:
                      openScope === '전체 공개'
                        ? 'ALL'
                        : openScope === '기업 공개'
                          ? 'COMPANY'
                          : 'ME',
                  }}
                />
              ),
            )}
          </React.Fragment>
        ))}
      </Carousel>
    </div>
  );
};
