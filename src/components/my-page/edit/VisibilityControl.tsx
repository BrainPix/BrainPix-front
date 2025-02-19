import { MouseEvent } from 'react';
import styles from './visibilityControl.module.scss';
import CheckButton from '../../../assets/icons/checkButton.svg?react';
import DisabledCheckButton from '../../../assets/icons/disabledCheckButton.svg?react';

interface VisibilityControlProps {
  visibility: '전체공개' | '기업공개' | '비공개';
  setVisibility: (value: '전체공개' | '기업공개' | '비공개') => void;
  isPortfolioVisible: boolean;
  togglePortfolioVisibility: () => void;
  handleEditClick: (e: MouseEvent) => void;
}

export const VisibilityControl = ({
  visibility,
  setVisibility,
  isPortfolioVisible,
  togglePortfolioVisibility,
  handleEditClick,
}: VisibilityControlProps) => {
  return (
    <div className={styles.formGroup}>
      <div className={styles.labelWrapper}>
        <span id='visibilityLabel'>
          공개 여부 <span className={styles.required}>(필수)</span>
        </span>
      </div>
      <div className={styles.visibilityContainer}>
        <div className={styles.visibilityGroupWrapper}>
          <div className={styles.visibilityWrapper}>
            <button
              className={`${styles.visibilityButton} ${
                visibility === '전체공개' ? styles.active : ''
              }`}
              onClick={() => setVisibility('전체공개')}>
              전체공개
            </button>
            <button
              className={`${styles.visibilityButton} ${
                visibility === '기업공개' ? styles.active : ''
              }`}
              onClick={() => setVisibility('기업공개')}>
              기업공개
            </button>
            <button
              className={`${styles.visibilityButton} ${
                visibility === '비공개' ? styles.active : ''
              }`}
              onClick={() => setVisibility('비공개')}>
              비공개
            </button>
          </div>
        </div>
        <div
          className={styles.portfolioVisibility}
          onClick={togglePortfolioVisibility}>
          {isPortfolioVisible ? <CheckButton /> : <DisabledCheckButton />}
          <span
            className={`${styles.portfolioText} ${
              isPortfolioVisible ? styles.active : ''
            }`}>
            프로필 공개
          </span>
          <button
            className={styles.editButton}
            onClick={handleEditClick}>
            <span>EDIT</span>
          </button>
        </div>
      </div>
    </div>
  );
};
