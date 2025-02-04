import { useNavigate } from 'react-router-dom';
import styles from './ideaMarketMain.module.scss';
import PreviewThumbnail from '../../components/preview/PreviewThumbnail';
import { Dropdown } from '../../components/common/dropdown/Dropdown';
import { Carousel } from '../../components/common/carousel/Carousel';

import Category from '../../assets/icons/category.svg?react';

export const IdeaMarketMain = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.ideaMarketMain}>
        <Carousel
          cardWidth={250}
          cardCount={3}
          gap={45}
          dataLength={6}>
          {Array(3)
            .fill(null)
            .map((_, index) => (
              <PreviewThumbnail
                key={index}
                username='메인'
                description='BrainPix 페이지'
                price={123456}
              />
            ))}
        </Carousel>
      </div>
      <div className={styles.headerComponents}>
        <div className={styles.leftComponents}>
          <div className={styles.ideaText}>맞춤형 아이디어 몰아보기</div>
          <div className={styles.reviseCategory}>
            <Category />
          </div>
        </div>
        <div className={styles.rightComponents}>
          <div>
            <button
              className={styles.registerButton}
              onClick={() => navigate('/idea-market/register')}>
              아이디어 등록
            </button>
          </div>
          <div className={styles.reviseDropdown}>
            <Dropdown />
          </div>
        </div>
      </div>
      <div className={styles.thumbnailGrid}>
        {Array(6)
          .fill(null)
          .map((_, index) => (
            <PreviewThumbnail
              key={index}
              username='최규호'
              description='BrainPix 페이지'
              price={500000}
            />
          ))}
      </div>
    </>
  );
};
