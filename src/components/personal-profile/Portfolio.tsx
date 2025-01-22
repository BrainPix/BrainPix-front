import classNames from 'classnames';
import styles from './portfolio.module.scss';
import { Carousel } from '../common/Carousel/Carousel';

export const Portfolio = () => {
  return (
    <div className={classNames(styles.container)}>
      <h1 className={classNames(styles.title)}>포트폴리오</h1>
      <Carousel
        gap={50}
        cardWidth={199}
        cardCount={4}
        buttonPosition='center'
        dataLength={10}>
        {new Array(10).fill(0).map((_, idx) => (
          <div
            key={idx}
            className={classNames(styles.portfolio)}>
            <div className={classNames(styles.image)} />
            <div className={classNames(styles.title)}>{idx}</div>
            <div className={classNames(styles.date)}>2024/12/25</div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};
