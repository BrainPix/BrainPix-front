import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import { Carousel } from '../common/carousel/Carousel';
import defaultImage from '../../assets/images/brainPixIcon.png';
import { getOtherProfilePosts } from '../../apis/profileAPI';
import styles from './postCarousel.module.scss';
import { getOtherPostsType } from '../../types/postDataType';
import { imageErrorHandler } from '../../utils/imageErrorHandler';
import { CATEGORY_LABELS } from '../../constants/categoryMapper';
import Bookmark from '../../assets/icons/bookmark.svg?react';
import { calculateDday } from '../../utils/calculateDday';

export const PostsCarousel = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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

  return (
    <div className={classNames(styles.container)}>
      {!posts ? (
        <div className={classNames(styles.noDataWrapper)}>
          <h3 className={classNames(styles.label)}>게시글</h3>
          <p className={classNames(styles.text)}>게시글이 없습니다.</p>
          <button
            onClick={() => navigate('/idea-market/register')}
            className={classNames(
              styles.addPortfolioButton,
              'buttonFilled-primary',
            )}>
            게시글 직성하러 가기
          </button>
        </div>
      ) : (
        <Carousel
          cardWidth={165}
          cardCount={4}
          gap={46.67}
          onClickNext={handleClickNextButton}
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
                  deadline,
                }: getOtherPostsType) => (
                  <div
                    key={postId}
                    className={classNames(styles.postWrapper)}>
                    <div className={classNames(styles.dDayLabel)}>
                      {calculateDday(deadline) === ''
                        ? '마감'
                        : calculateDday(deadline)}
                    </div>
                    <div className={classNames(styles.postInfoWrapper)}>
                      <div className={classNames(styles.row)}>
                        <div className={classNames(styles.scopeLabel)}>
                          {openScope}
                        </div>
                        <div className={classNames(styles.specialization)}>
                          {CATEGORY_LABELS[specialization]}
                        </div>
                      </div>
                      <div className={classNames(styles.title)}>{title}</div>
                    </div>

                    <img
                      alt='게시글 대표사진'
                      className={classNames(styles.image)}
                      src={thumbnailImage || defaultImage}
                      onError={imageErrorHandler}
                    />

                    <div className={classNames(styles.userProfileWrapper)}>
                      <img
                        alt='작성자 프로필'
                        src={writerImageUrl}
                        className={classNames(styles.userProfileImage)}
                      />
                      <div className={classNames(styles.nameWrapper)}>
                        <p className={classNames(styles.userName)}>
                          {writerName || '이름 없음'}
                        </p>
                        <div className={classNames(styles.popularWrapper)}>
                          <span>저장 {savedCount}</span>
                          <span>조회 {viewCount}</span>
                        </div>
                      </div>
                      <Bookmark className={classNames(styles.bookmark)} />
                    </div>
                  </div>
                ),
              )}
            </React.Fragment>
          ))}
        </Carousel>
      )}
    </div>
  );
};
