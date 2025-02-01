import { useState } from 'react';
import styles from './recommendedSection.module.scss';
import ClickButton from '../../assets/icons/clickButton.svg?react';

const PopularIdeasSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalItems = 4;

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(1, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalItems - 2, prev + 1));
  };

  return (
    <section className={styles.container}>
      <div className={styles.headerWrapper}>
        <div className={styles.headerContent}>
          <p className={styles.subTitle}>
            오직 <span className={styles.highlight}>브레인픽스</span>에서만
          </p>
          <div className={styles.title}>
            금주의 <span className={styles.highlight}>인기 Idea Solution</span>
          </div>
        </div>
        <div className={styles.notice}>
          Idea Solution에서는 과제를 제안해드립니다.
        </div>
      </div>

      <div className={styles.sliderContainer}>
        <button
          className={styles.navButton}
          onClick={handlePrevious}
          disabled={currentPage === 1}>
          <ClickButton className={styles.rotatedButton} />
        </button>

        <div className={styles.grid}>
          {[...Array(3)].map((_, index) => (
            <div
              key={currentPage + index}
              className={styles.card}></div>
          ))}
        </div>

        <button
          className={styles.navButton}
          onClick={handleNext}
          disabled={currentPage >= totalItems - 2}>
          <ClickButton />
        </button>
      </div>

      <div className={styles.more}>
        <button>더보기</button>
      </div>
    </section>
  );
};

export default PopularIdeasSection;
