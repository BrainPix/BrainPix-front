import { Carousel } from '../common/carousel/Carousel';
import classNames from 'classnames';
import styles from './postCarousel.module.scss';

export const PostsCarousel = () => {
  return (
    <div className={classNames(styles.container)}>
      <h1 className={classNames(styles.title)}>게시글</h1>
      <Carousel
        cardWidth={290}
        dataLength={10}
        gap={38}
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
