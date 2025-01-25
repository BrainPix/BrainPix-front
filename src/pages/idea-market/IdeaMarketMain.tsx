import styles from './IdeaMarketMain.module.scss';
import RecommendedSection from '../../components/recommend/RecommendedSection';
import PreviewThumbnail from '../../components/preview/PreviewThumbnail';
import Dropdown from '../../components/dropdown/Dropdown';

const IdeaMarketMain = () => {
  return (
    <>
      <div className={styles.ideaMarketMain}>
        <RecommendedSection />
      </div>
      <div className={styles.headerContainer}>
        <div className={styles.ideaText}>맞춤형 아이디어 몰아보기</div>
        <div className={styles.buttonGroup}>
          <button className={styles.registerButton}>아이디어 등록</button>
          <Dropdown />
        </div>
      </div>
    </>
  );
};

export default IdeaMarketMain;
