import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './portfolio.module.scss';
import { useInfiniteQuery } from '@tanstack/react-query';

import { AddPortfolioModal } from '../../../components/my-page/portfolio/AddPortfolioModal';
import { useOutsideClick } from '../../../hooks/useOutsideClick';
import Loading from '../../../assets/icons/loading.svg?react';
import { PortfolioDetailModal } from '../../../components/my-page/portfolio/PortfolioDetailModal';
import { getPorfolios } from '../../../apis/portfolio';
import placeholder from '../../../assets/images/brainPixIcon.png';
import { MyPorfolioType } from '../../../types/myPageType';
import { useIntersectionObserverAPI } from '../../../hooks/useIntersectionObserverAPI';
import { imageErrorHandler } from '../../../utils/imageErrorHandler';

export const Portfolio = () => {
  const [lastCardId, setLastCardId] = useState(0);
  const [clickedCardId, setClickedCardId] = useState<number>(-1);
  const [userId, setUserId] = useState(-1);

  useEffect(() => {
    const myUserId = localStorage.getItem('userId');
    if (myUserId) {
      setUserId(Number(myUserId));
    }
  }, []);

  const { setTarget } = useIntersectionObserverAPI({
    onIntersect: (observer) => {
      if (observer.isIntersecting) {
        fetchNextPage();
        const totalCurrentCardLength = myPorfolios?.pages.reduce(
          (acc, page) => acc + page.content.length,
          0,
        );

        setLastCardId(totalCurrentCardLength - 1);
      }
    },
  });

  const {
    data: myPorfolios,
    isFetching: isGetPorfoliosPending,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['myPortfolios'],
    queryFn: ({ pageParam = 0 }) =>
      getPorfolios({ page: pageParam, size: 8, userId }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, pages) => {
      if (lastPage.currentPage < pages[0].totalPages) {
        return lastPage?.currentPage + 1;
      }
    },
    enabled: userId !== -1,
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
    setClickedCardId(-1);
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
      {myPorfolios?.pages[0].content.length == 0 && (
        <div className={classNames(styles.noDataText)}>
          포트폴리오가 없습니다.
        </div>
      )}
      <div className={classNames(styles.portfolioContainer)}>
        {myPorfolios?.pages.map((portfolios, pageIdx) => (
          <React.Fragment key={portfolios.currentPage}>
            {portfolios.content.map(
              (
                { id, title, createdDate, profileImage }: MyPorfolioType,
                idx: number,
              ) => (
                <div
                  key={id}
                  ref={8 * pageIdx + idx === lastCardId ? setTarget : null}
                  onClick={() => handleClickPorfolioCard(id)}
                  className={classNames(styles.portfolioCardWrapper)}>
                  <img
                    alt='포트폴리오 사진'
                    className={classNames(styles.image)}
                    src={profileImage || placeholder}
                    onError={imageErrorHandler}
                  />
                  <p className={classNames(styles.portfolioTitle)}>{title}</p>
                  <p className={classNames(styles.date)}>{createdDate}</p>
                </div>
              ),
            )}
          </React.Fragment>
        ))}
      </div>
      {isGetPorfoliosPending && (
        <div className={classNames(styles.loadingIconWrapper)}>
          <Loading />
        </div>
      )}
    </div>
  );
};
