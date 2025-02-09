import { useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './portfolio.module.scss';
import { useQuery } from '@tanstack/react-query';

import { AddPortfolioModal } from '../../../components/my-page/portfolio/AddPortfolioModal';
import { useOutsideClick } from '../../../hooks/useOutsideClick';
import { PortfolioDetailModal } from '../../../components/my-page/portfolio/PortfolioDetailModal';
import { getMyPorfolio } from '../../../apis/portfolio';
import { MyPorfolioType } from '../../../types/myPageType';

export const Portfolio = () => {
  const PORTFOLIO_COUNT = 8;

  const { data: myPorfolios, isPending: isGetPorfoliosPending } = useQuery({
    queryKey: ['myPorfolios'],
    queryFn: getMyPorfolio,
  });

  const [isOpenAddPortfolioModal, setIsOpenAddPortfolioModal] = useState(false);
  const [isOpenPortfolioDetailModal, setIsOpenPortfolioDetailModal] =
    useState(false);

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

  const portfolios = myPorfolios.content as MyPorfolioType[];

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
          ref={portfolioDetailModalRef}
          onClose={handleClosePortfolioDetailModal}
        />
      )}
      <div className={classNames(styles.title)}>
        포트폴리오 관리하기
        <span className={classNames(styles.portfolioCount)}>
          {PORTFOLIO_COUNT}
        </span>
        <button
          onClick={() => setIsOpenAddPortfolioModal(true)}
          className={classNames('buttonOutlined-grey500', styles.addButton)}>
          추가하기
        </button>
      </div>
      <div className={classNames(styles.portfolioContainer)}>
        {portfolios.map(({ id, title, createdDate, profileImage }) => (
          <div
            key={id}
            onClick={() => setIsOpenPortfolioDetailModal(true)}
            className={classNames(styles.portfolioCardWrapper)}>
            {profileImage ? (
              <img
                alt='포트폴리오 사진'
                className={classNames(styles.image)}
                src={profileImage}
              />
            ) : (
              <div className={classNames(styles.image)} />
            )}
            <p className={classNames(styles.portfolioTitle)}>{title}</p>
            <p className={classNames(styles.date)}>{createdDate}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
