import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { Carousel } from '../common/carousel/Carousel';
import defaultImage from '../../assets/images/brainPixIcon.png';
import { getOtherProfilePosts } from '../../apis/profileAPI';
import styles from './postCarousel.module.scss';
import { getOtherPostsType } from '../../types/postDataType';
import { imageErrorHandler } from '../../utils/imageErrorHandler';

export const PostsCarousel = () => {
  const { id } = useParams();

  const [clickedPage, setClickedPage] = useState(0);
  const [currentData, setCurrentData] = useState<getOtherPostsType[][]>([]);

  const { data: posts, isFetching: isFetchingPosts } = useQuery({
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
      return idx === posts ? posts.content : value;
    });
    setCurrentData(updatedData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedPage, posts]);

  const handleClickNextButton = () => {
    setClickedPage((prev) => prev + 1);
  };

  const handleClickPreviousButton = () => {
    setClickedPage((prev) => prev - 1);
  };

  if (isFetchingPosts) {
    <div>로딩 중,,</div>;
  }

  return (
    <div className={classNames(styles.container)}>
      <Carousel
        cardWidth={165}
        dataLength={10}
        cardCount={4}
        gap={46.67}
        label='게시글'
        buttonPosition='top'>
        {currentData.map((posts, pageIdx) => (
          <React.Fragment key={pageIdx}>
            {posts.map(
              ({ postId, title, thumbnailImage }: getOtherPostsType) => (
                <div
                  key={postId}
                  className={classNames(styles.postWrapper)}>
                  <img
                    alt='게시글 대표사진'
                    className={classNames(styles.image)}
                    src={thumbnailImage || defaultImage}
                    onError={imageErrorHandler}
                  />
                  <div className={classNames(styles.title)}>{title}</div>
                </div>
              ),
            )}
          </React.Fragment>
        ))}
      </Carousel>
    </div>
  );
};
