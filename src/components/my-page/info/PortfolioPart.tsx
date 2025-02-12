import { useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './portfolioPart.module.scss';

import { useOutsideClick } from '../../../hooks/useOutsideClick';
import { Carousel } from '../../common/carousel/Carousel';
import { PortfolioPopup } from '../../personal-profile/PortfolioPopup';
import { useNavigate } from 'react-router-dom';

interface PortfolioParttPropsType {
  editMode: boolean;
  userType: '개인' | '기업';
}

export const PortfolioPart = ({ editMode }: PortfolioParttPropsType) => {
  const popupRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [openPopup, setOpenPopup] = useState(false);

  const handleClosePopup = () => {
    setOpenPopup(false);
  };

  useOutsideClick({ ref: popupRef, handler: handleClosePopup });

  return (
    <div className={classNames(styles.portfolioWrapper)}>
      <div className={classNames(styles.container)}>
        {openPopup && (
          <PortfolioPopup
            onClosePopup={handleClosePopup}
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
    </div>
  );
};
