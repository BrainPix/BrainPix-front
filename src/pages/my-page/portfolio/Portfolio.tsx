import classNames from 'classnames';
import styles from './ portfolio.module.scss';
import { AddPortfolioModal } from '../../../components/my-page/portfolio/AddPortfolioModal';

export const Portfolio = () => {
  const PORTFOLIO_COUNT = 6;

  return (
    <div className={classNames(styles.container)}>
      <AddPortfolioModal />
      <div className={classNames(styles.title)}>
        포트폴리오 관리하기
        <span className={classNames(styles.portfolioCount)}>
          {PORTFOLIO_COUNT}
        </span>
        <button
          className={classNames(styles.addButton, 'buttonOutlined-grey500')}>
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
