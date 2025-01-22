import { ReactNode, useState } from 'react';
import classNames from 'classnames';
import Arrow from '../../../assets/icons/arrowRight.svg?react';
import styles from './Carousel.module.scss';

interface CarouselProps {
  buttonPosition?: 'top' | 'center';
  cardCount?: number;
  cardWidth: number;
  dataLength: number;
  gap: number;
  children: ReactNode;
}

export const Carousel = ({
  buttonPosition = 'top',
  cardWidth,
  cardCount = 3,
  gap,
  dataLength,
  children,
}: CarouselProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const TRANSITION_NUMBER = (cardWidth + gap) * cardCount;
  const LAST_PAGE = dataLength / cardCount;

  const handleClickNextButton = () => {
    setCurrentPage((prev) => prev + 1);
  };
  const handleClickPreviousButton = () => {
    setCurrentPage((prev) => prev - 1);
  };
  return (
    <div className={classNames(styles.container)}>
      {buttonPosition === 'top' ? (
        <div className={classNames(styles.navigationControls)}>
          <button
            disabled={currentPage <= 0}
            className={classNames(styles.arrow, {
              [styles.disabled]: currentPage === 0,
            })}>
            <Arrow
              width={24}
              height={24}
              className={classNames(styles.left)}
              onClick={handleClickPreviousButton}
            />
          </button>
          <button
            onClick={handleClickNextButton}
            disabled={currentPage > LAST_PAGE - 1}
            className={classNames(styles.arrow, {
              [styles.disabled]: currentPage > LAST_PAGE - 1,
            })}>
            <Arrow
              width={24}
              height={24}
            />
          </button>
        </div>
      ) : (
        <div className={classNames(styles.centerNavigationControls)}>
          <button
            disabled={currentPage <= 0}
            className={classNames(styles.arrow, {
              [styles.disabled]: currentPage === 0,
            })}>
            <Arrow
              width={40}
              height={40}
              color={currentPage <= 0 ? '#9e9e9e' : 'black'}
              onClick={handleClickPreviousButton}
              className={classNames(styles.left)}
            />
          </button>
          <button
            onClick={handleClickNextButton}
            disabled={currentPage > LAST_PAGE - 1}
            className={classNames(styles.arrow, {
              [styles.disabled]: currentPage > LAST_PAGE - 1,
            })}>
            <Arrow
              width={40}
              height={40}
            />
          </button>
        </div>
      )}
      <div className={classNames(styles.carouselContainer)}>
        <div
          className={classNames(styles.contentWrapper)}
          style={{
            transform: `translateX(-${currentPage * TRANSITION_NUMBER}px)`,
            gap: `${gap}px`,
          }}>
          {children}
        </div>
      </div>
    </div>
  );
};
