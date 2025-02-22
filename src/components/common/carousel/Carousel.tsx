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
  label?: string;
  children: ReactNode;
  editMode?: boolean;
  onClickManagetText?: () => void;
  onClickNext?: () => void;
  onClickPrevious?: () => void;
}

export const Carousel = ({
  buttonPosition = 'top',
  cardWidth,
  cardCount = 3,
  gap,
  label,
  dataLength,
  editMode = false,
  onClickManagetText,
  children,
  onClickNext,
  onClickPrevious,
}: CarouselProps) => {
  const [currentPage, setCurrentPage] = useState(0);
  const TRANSITION_NUMBER = (cardWidth + gap) * cardCount;
  const LAST_PAGE = dataLength / cardCount;

  const handleClickNextButton = () => {
    setCurrentPage((prev) => prev + 1);
    onClickNext?.();
  };
  const handleClickPreviousButton = () => {
    setCurrentPage((prev) => prev - 1);
    onClickPrevious?.();
  };
  return (
    <div className={classNames(styles.container)}>
      {buttonPosition === 'top' ? (
        <div className={classNames(styles.labelContainer)}>
          <div className={classNames(styles.label)}>
            {label}{' '}
            {editMode && (
              <span
                className={classNames(styles.manageText)}
                onClick={onClickManagetText}>
                관리하기
              </span>
            )}
          </div>
          <div className={classNames(styles.navigationControls)}>
            <button
              type='button'
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
              type='button'
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
        </div>
      ) : (
        <div className={classNames(styles.centerNavigationControls)}>
          <button
            type='button'
            disabled={currentPage <= 0}
            className={classNames(styles.arrow, {
              [styles.disabled]: currentPage === 0,
            })}>
            <Arrow
              width={40}
              height={40}
              stroke='#555555'
              color={currentPage <= 0 ? '#9e9e9e' : 'black'}
              onClick={handleClickPreviousButton}
              className={classNames(styles.left)}
            />
          </button>
          <button
            type='button'
            onClick={handleClickNextButton}
            disabled={currentPage > LAST_PAGE - 1}
            className={classNames(styles.arrow, {
              [styles.disabled]: currentPage > LAST_PAGE - 1,
            })}>
            <Arrow
              width={40}
              height={40}
              stroke='#555555'
            />
          </button>
        </div>
      )}
      <div
        className={classNames(styles.carouselContainer, {
          [styles.buttonCenter]: buttonPosition === 'center',
        })}>
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
