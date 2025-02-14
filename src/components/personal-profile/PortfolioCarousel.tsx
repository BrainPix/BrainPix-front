import { useRef, useState } from 'react';
import classNames from 'classnames';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { Carousel } from '../common/carousel/Carousel';
import { PortfolioPopup } from './PortfolioPopup';
import { useOutsideClick } from '../../hooks/useOutsideClick';
import styles from './portfolioCarousel.module.scss';
import { getPorfolios } from '../../apis/portfolio';
import { imageErrorHandler } from '../../utils/imageErrorHandler';
import { MyPorfolioType } from '../../types/myPageType';

interface PortfolioCarouselPropsType {
  size: number;
}

export const PortfolioCarousel = ({ size }: PortfolioCarouselPropsType) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const [openPopup, setOpenPopup] = useState(false);
  const { id, userType } = useParams();

  const [clickedPage, setClickedPage] = useState(0);

  const { data: portfolios } = useQuery({
    queryKey: ['portfolios', clickedPage],
    queryFn: () => getPorfolios(clickedPage, Number(id)),
    enabled: false,
  });

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
        {portfolios.data.content.map(
          ({ id, title, createdDate, profileImage }: MyPorfolioType) => (
            <div
              key={id}
              className={classNames(styles.portfolio)}
              onClick={() => setOpenPopup(true)}>
              <img
                alt='포트폴리오 대표사진'
                className={classNames(styles.image)}
                src={profileImage}
                onError={imageErrorHandler}
              />
              <div className={classNames(styles.title)}>{title}</div>
              <div className={classNames(styles.date)}>{createdDate}</div>
            </div>
          ),
        )}
      </Carousel>
    </div>
  );
};
