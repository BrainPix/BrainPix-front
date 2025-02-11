import React from 'react';
import { SyntheticEvent, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './portfolio.module.scss';
import { useInfiniteQuery } from '@tanstack/react-query';

import { AddPortfolioModal } from '../../../components/my-page/portfolio/AddPortfolioModal';
import { useOutsideClick } from '../../../hooks/useOutsideClick';
import { PortfolioDetailModal } from '../../../components/my-page/portfolio/PortfolioDetailModal';
import { getMyPorfolio } from '../../../apis/portfolio';
import placeholder from '../../../assets/images/brainPixIcon.png';
import { MyPorfolioType } from '../../../types/myPageType';
import { useIntersectionObserverAPI } from '../../../hooks/useIntersectionObserverAPI';

export const Portfolio = () => {
  const [lastCardId, setLastCardId] = useState(0);
  const [clickedCardId, setClickedCardId] = useState(-1);

  const imageOnErrorHandler = (e: SyntheticEvent<HTMLImageElement>) => {
    console.log(e);
    e.currentTarget.src = placeholder;
  };

  const { setTarget } = useIntersectionObserverAPI({
    onIntersect: () => {
      fetchNextPage();
      const totalCurrentCardLength = myPorfolios?.pages.reduce(
        (acc, page) => acc + page.content.length,
        0,
      );
      setLastCardId(totalCurrentCardLength - 1);
    },
  });

  const {
    data: myPorfolios,
    isFetching: isGetPorfoliosPending,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['myPorfolios'],
    queryFn: ({ pageParam = 0 }) => getMyPorfolio(pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.currentPage < pages[0].totalPages) {
        return lastPage?.currentPage + 1;
      }
      return null;
    },
  });

  const [isOpenAddPortfolioModal, setIsOpenAddPortfolioModal] = useState(false);
  const [isOpenPortfolioDetailModal, setIsOpenPortfolioDetailModal] =
    useState(false);

  const handleClickPorfolioCard = (id: number) => {
    setIsOpenPortfolioDetailModal(true);
    setClickedCardId(id);
  };

  const handleCloseAddPortfolioModal = () => {
    setIsOpenAddPortfolioModal(false);
  };

  const handleClosePortfolioDetailModal = () => {
    setIsOpenPortfolioDetailModal(false);
  };

  const addPortfolioModalRef = useRef(null);
  const portfolioDetailModalRef = useRef(null);
  useOutsideClick({
    ref: addPortfolioModalRef,
    handler: handleCloseAddPortfolioModal,
  });
  useOutsideClick({
    ref: portfolioDetailModalRef,
    handler: handleClosePortfolioDetailModal,
  });

  if (isGetPorfoliosPending) {
    return <div>로딩 중,,,</div>;
  }

  return (
    <div className={classNames(styles.container)}>
      {isOpenAddPortfolioModal && (
        <AddPortfolioModal
          ref={addPortfolioModalRef}
          onClose={handleCloseAddPortfolioModal}
        />
      )}
      {isOpenPortfolioDetailModal && (
        <PortfolioDetailModal
          cardId={clickedCardId}
          ref={portfolioDetailModalRef}
          onClose={handleClosePortfolioDetailModal}
        />
      )}
      <div className={classNames(styles.title)}>
        포트폴리오 관리하기
        <span className={classNames(styles.portfolioCount)}>
          {myPorfolios?.pages[0].totalElements ?? 0}
        </span>
        <button
          onClick={() => setIsOpenAddPortfolioModal(true)}
          className={classNames('buttonOutlined-grey500', styles.addButton)}>
          추가하기
        </button>
      </div>
      <div className={classNames(styles.portfolioContainer)}>
        {myPorfolios?.pages.map((portfolios) => (
          <React.Fragment key={portfolios.currentPage}>
            {portfolios.content.map(
              (
                { id, title, createdDate, profileImage }: MyPorfolioType,
                idx: number,
              ) => (
                <div
                  key={id}
                  ref={idx === lastCardId ? setTarget : null}
                  onClick={() => handleClickPorfolioCard(id)}
                  className={classNames(styles.portfolioCardWrapper)}>
                  <img
                    alt='포트폴리오 사진'
                    className={classNames(styles.image)}
                    src={profileImage || placeholder}
                    onError={imageOnErrorHandler}
                  />

                  <p className={classNames(styles.portfolioTitle)}>{title}</p>
                  <p className={classNames(styles.date)}>{createdDate}</p>
                </div>
              ),
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};
