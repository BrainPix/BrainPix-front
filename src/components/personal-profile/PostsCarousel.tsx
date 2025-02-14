import classNames from 'classnames';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Carousel } from '../common/carousel/Carousel';
import { getOtherProfilePosts } from '../../apis/profileAPI';
import styles from './postCarousel.module.scss';

export const PostsCarousel = () => {
  const { id } = useParams();

  const [clickedPostsPage, setClickedPostsPage] = useState(0);

  const { data: posts, isFetching: isFetchingPosts } = useQuery({
    queryKey: ['posts', clickedPostsPage],
    queryFn: () => getOtherProfilePosts(Number(id)),
    enabled: false,
  });

  const handleClickNextButton = () => {
    setClickedPostsPage((prev) => prev + 1);
  };

  const handleClickPreviousButton = () => {
    setClickedPostsPage((prev) => prev - 1);
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
        {new Array(10).fill(0).map((_, idx) => (
          <div
            key={idx}
            className={classNames(styles.postWrapper)}>
            <div className={classNames(styles.image)} />
            <div className={classNames(styles.title)}>
              {idx}번째 게시글에 대한 정보
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};
