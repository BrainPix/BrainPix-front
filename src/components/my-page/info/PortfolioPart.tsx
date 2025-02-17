import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './portfolioPart.module.scss';
import { useNavigate } from 'react-router-dom';

import { useOutsideClick } from '../../../hooks/useOutsideClick';
import { Carousel } from '../../common/carousel/Carousel';
import { useQuery } from '@tanstack/react-query';
import { getPorfolios } from '../../../apis/portfolio';
import { MyPorfolioType } from '../../../types/myPageType';
import { imageErrorHandler } from '../../../utils/imageErrorHandler';
import { PortfolioDetailModal } from '../portfolio/PortfolioDetailModal';
import React from 'react';

interface PortfolioParttPropsType {
  editMode: boolean;
  userType: '개인' | '기업';
}

export const PortfolioPart = ({ editMode }: PortfolioParttPropsType) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [openPopup, setOpenPopup] = useState(false);
  const [clickedCardId, setClickedCardId] = useState(-1);
  const [userId, setUserId] = useState(-1);
  const [currentData, setCurrentData] = useState<MyPorfolioType[][]>([]);
  const [clickedPage, setClickedPage] = useState<number>(0);

  useEffect(() => {
    const myUserId = localStorage.getItem('userId');
    if (myUserId) {
      setUserId(Number(myUserId));
    }
  }, [userId]);

  const { data: myPorfolios } = useQuery({
    queryKey: ['myPorfolios', clickedPage],
    queryFn: () =>
      getPorfolios({ page: clickedPage, size: 4, userId: Number(userId) }),
    enabled: userId !== -1,
  });

  useEffect(() => {
    if (!myPorfolios || userId === -1) return;

    if (!currentData.length) {
      const dataArray = new Array(myPorfolios?.totalPages).fill([]);
      dataArray[0] = myPorfolios.content;
      return setCurrentData(dataArray);
    }
    const updatedData = currentData.map((value, idx) => {
      return idx === clickedPage ? myPorfolios.content : value;
    });
    setCurrentData(updatedData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clickedPage, myPorfolios, userId]);

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  const handleClickNext = () => {
    setClickedPage((prev) => prev + 1);
  };

  useOutsideClick({ ref: popupRef, handler: handleClosePopup });

  return (
    <div className={classNames(styles.portfolioWrapper)}>
      <div className={classNames(styles.container)}>
        {openPopup && (
          <PortfolioDetailModal
            cardId={clickedCardId}
            onClose={handleClosePopup}
            ref={popupRef}
          />
        )}
        <Carousel
          gap={33.33}
          cardWidth={150}
          cardCount={4}
          buttonPosition='top'
          label='포트폴리오'
          onClickNext={handleClickNext}
          editMode={editMode}
          onClickManagetText={() => navigate('/my/portfolio')}
          dataLength={myPorfolios?.totalElements}>
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
                    <img
                      className={classNames(styles.image)}
                      alt='포트폴리오 대표사진'
                      src={profileImage}
                      onError={imageErrorHandler}
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
    </div>
  );
};
