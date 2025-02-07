import { Carousel } from '../common/carousel/Carousel';
import classNames from 'classnames';
import styles from './postCarousel.module.scss';

export const PostsCarousel = () => {
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
