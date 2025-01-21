import classNames from 'classnames';
import styles from './portfolio.module.scss';
import Arrow from '../../assets/icons/arrowRight.svg?react';
import { useState } from 'react';

export const Portfolio = () => {
  const [carecelCurrent, setCarecelCurrent] = useState(0);
  const carecelTransitionWidth = 249;

  const handleClickNextButton = () => {
    setCarecelCurrent((prev) => prev + 1);
  };

  const handleClickPreviousButton = () => {
    setCarecelCurrent((prev) => prev - 1);
  };
  return (
    <div className={classNames(styles.container)}>
      <h1 className={classNames(styles.title)}>포트폴리오</h1>
      <div className={classNames(styles.navigationControls)}>
        <button>
          <Arrow
            color='#9e9e9e'
            className={classNames(styles.left)}
            onClick={handleClickPreviousButton}
          />
        </button>
        <button onClick={handleClickNextButton}>
          <Arrow />
        </button>
      </div>
      <div className={classNames(styles.portfolioContainer)}>
        <div
          className={classNames(styles.container)}
          style={{
            transform: `translateX(-${carecelCurrent * carecelTransitionWidth}px)`,
          }}>
          {new Array(10).fill(0).map((_, idx) => (
            <div
              key={idx}
              className={classNames(styles.portfolio)}>
              <div className={classNames(styles.image)} />
              <div className={classNames(styles.title)}>{idx}</div>
              <div className={classNames(styles.date)}>2024/12/25</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
