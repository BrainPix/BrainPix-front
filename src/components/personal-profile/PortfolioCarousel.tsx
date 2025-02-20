import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

import { Carousel } from '../common/carousel/Carousel';
import styles from './portfolioCarousel.module.scss';
import { getPorfolios } from '../../apis/portfolio';
import { MyPorfolioType } from '../../types/myPageType';
import React from 'react';
import { Image } from '../common/image/Image';
import { PortfolioDetailModal } from '../my-page/portfolio/PortfolioDetailModal';
import { useOutsideClick } from '../../hooks/useOutsideClick';

interface PortfolioCarouselPropsType {
  size: number;
}

export const PortfolioCarousel = ({ size }: PortfolioCarouselPropsType) => {
  const { id } = useParams();
  const popupRef = useRef<HTMLDivElement>(null);

  const [currentData, setCurrentData] = useState<MyPorfolioType[][]>([]);
  const [clickedPage, setClickedPage] = useState<number>(0);
  const [openPopup, setOpenPopup] = useState(false);
  const [clickedCardId, setClickedCardId] = useState(-1);

  const { data: portfolios } = useQuery({
    queryKey: ['portfolios', clickedPage],
    queryFn: () =>
      getPorfolios({ page: clickedPage, size: 4, userId: Number(id) }),
  });

  useEffect(() => {
    if (!portfolios) return;

    if (!currentData.length) {
      const dataArray = new Array(portfolios?.totalPages).fill([]);
      dataArray[0] = portfolios.content;
      return setCurrentData(dataArray);
    }
    const updatedData = currentData.map((value, idx) => {
      return idx === clickedPage ? portfolios.content : value;
    });
    setCurrentData(updatedData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedPage, portfolios]);

  const handleClickNext = () => {
    setClickedPage((prev) => prev + 1);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  useOutsideClick({ ref: popupRef, handler: handleClosePopup });

  return (
    <div className={classNames(styles.container)}>
      {openPopup && (
        <PortfolioDetailModal
          cardId={clickedCardId}
          onClose={handleClosePopup}
          ref={popupRef}
          editable={false}
        />
      )}
      <Carousel
        gap={46.67}
        cardWidth={165}
        cardCount={size}
        buttonPosition='top'
        label='포트폴리오'
        onClickNext={handleClickNext}
        dataLength={portfolios?.totalElements}>
        {currentData.map((portfolios, pageIdx) => (
          <React.Fragment key={pageIdx}>
            {portfolios.map(
              ({ id, title, createdDate, profileImage }: MyPorfolioType) => (
                <div
                  key={id}
                  className={classNames(styles.portfolio)}
                  onClick={() => {
                    setOpenPopup(true);
                    setClickedCardId(id);
                  }}>
                  <Image
                    alt='포트폴리오 대표사진'
                    className={classNames(styles.image)}
                    src={profileImage}
                  />
                  <div className={classNames(styles.title)}>{title}</div>
                  <div className={classNames(styles.date)}>{createdDate}</div>
                </div>
              ),
            )}
          </React.Fragment>
        ))}
      </Carousel>
    </div>
  );
};
