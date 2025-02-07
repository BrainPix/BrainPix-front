import { useRef, useState } from 'react';
import classNames from 'classnames';
import { Carousel } from '../common/carousel/Carousel';
import { PortfolioPopup } from './PortfolioPopup';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import styles from './portfolioCarousel.module.scss';

interface PortfolioCarouselPropsType {
  size: number;
}

export const PortfolioCarousel = ({ size }: PortfolioCarouselPropsType) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [openPopup, setOpenPopup] = useState(false);
  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  useOutsideClick({ ref: popupRef, handler: handleClosePopup });

  return (
    <div className={classNames(styles.container)}>
      {openPopup && (
        <PortfolioPopup
          onClosePopup={handleClosePopup}
          ref={popupRef}
        />
      )}
      <Carousel
        gap={46.67}
        cardWidth={165}
        cardCount={size}
        buttonPosition='top'
        label='포트폴리오'
        dataLength={10}>
        {new Array(10).fill(0).map((_, idx) => (
          <div
            key={idx}
            className={classNames(styles.portfolio)}
            onClick={() => setOpenPopup(true)}>
            <div className={classNames(styles.image)} />
            <div className={classNames(styles.title)}>{idx}</div>
            <div className={classNames(styles.date)}>2024/12/25</div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};
