import { useRef, useState } from 'react';
import classNames from 'classnames';
import { Carousel } from '../common/Carousel/Carousel';
import { PortfolioPopup } from './portfolioPopup';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import styles from './portfolioCarousel.module.scss';

export const PortfolioCarousel = () => {
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
      <h1 className={classNames(styles.title)}>포트폴리오</h1>
      <Carousel
        gap={50}
        cardWidth={199}
        cardCount={4}
        buttonPosition='top'
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
