import { useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './ portfolio.module.scss';

import { AddPortfolioModal } from '../../../components/my-page/portfolio/AddPortfolioModal';
import { useOutsideClick } from '../../../hooks/useOutsideClick';

export const Portfolio = () => {
  const PORTFOLIO_COUNT = 6;

  const [isOpenAddPortfolioModal, setIsOpenAddPortfolioModal] = useState(false);

  const closeOpenAddPortfolioModal = () => {
    setIsOpenAddPortfolioModal(false);
  };

  const addPortfolioModalRef = useRef(null);
  useOutsideClick({
    ref: addPortfolioModalRef,
    handler: closeOpenAddPortfolioModal,
  });

  return (
    <div className={classNames(styles.container)}>
      {isOpenAddPortfolioModal && (
        <AddPortfolioModal
          ref={addPortfolioModalRef}
          onClose={closeOpenAddPortfolioModal}
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
        {new Array(8)
          .fill(0)
          .map((_, idx) => idx)
          .map((val) => (
            <div
              key={val}
              className={classNames(styles.portfolioCardWrapper)}>
              <div className={classNames(styles.image)} />
              <p className={classNames(styles.portfolioTitle)}>{val}</p>
              <p className={classNames(styles.date)}>2024/12/25</p>
            </div>
          ))}
      </div>
    </div>
  );
};
