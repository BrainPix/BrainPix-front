import { useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './portfolioPart.module.scss';
import { useNavigate } from 'react-router-dom';

import { useOutsideClick } from '../../../hooks/useOutsideClick';
import { Carousel } from '../../common/carousel/Carousel';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getMyPorfolio } from '../../../apis/portfolio';
import { MyPorfolioType } from '../../../types/myPageType';
import { imageErrorHandler } from '../../../utils/imageErrorHandler';
import { PortfolioDetailModal } from '../portfolio/PortfolioDetailModal';

interface PortfolioParttPropsType {
  editMode: boolean;
  userType: '개인' | '기업';
}

export const PortfolioPart = ({ editMode }: PortfolioParttPropsType) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [openPopup, setOpenPopup] = useState(false);
  const [clickedCardId, setClickedCardId] = useState(-1);

  const { data: myPorfolios, isFetching: isGetPortfoliosFetching } =
    useInfiniteQuery({
      queryKey: ['myPortfolios'],
      queryFn: ({ pageParam = 0 }) => getMyPorfolio(pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.currentPage < pages[0].totalPages) {
          return lastPage?.currentPage + 1;
        }
      },
    });

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  useOutsideClick({ ref: popupRef, handler: handleClosePopup });

  if (isGetPortfoliosFetching) {
    return <div>로딩 중..</div>;
  }

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
          editMode={editMode}
          onClickManagetText={() => navigate('/my/portfolio')}
          dataLength={myPorfolios && myPorfolios.pages[0].totalElements}>
          {myPorfolios?.pages[0].content.map(
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
        </Carousel>
      </div>
    </div>
  );
};
