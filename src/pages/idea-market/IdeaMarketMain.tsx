import { useNavigate } from 'react-router-dom';
import styles from './IdeaMarketMain.module.scss';
import RecommendedSection from '../../components/recommend/RecommendedSection';
import PreviewThumbnail from '../../components/preview/PreviewThumbnail';
import Dropdown from '../../components/dropdown/Dropdown';

import Category from '../../assets/icons/category.svg?react';

const IdeaMarketMain = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className={styles.ideaMarketMain}>
        <RecommendedSection />
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

export default IdeaMarketMain;
