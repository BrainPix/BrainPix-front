import { MouseEvent, KeyboardEvent } from 'react';
import styles from './pageSelect.module.scss';
import InfoDropdown from '../../../assets/icons/infoDropdown.svg?react';

interface PageSelectProps {
  pageType: 'Idea Solution' | 'Market Place';
  setPageType: (value: 'Idea Solution' | 'Market Place') => void;
  showDetail: boolean;
  setShowDetail: (value: boolean) => void;
}

const PAGE_TYPE_DETAILS = {
  'Idea Solution': {
    label: 'Idea Solution이란?',
    mainText: '전문가가 제공하는 과제 제작 서비스',
    subText: `ex) '블로그 제작을 도와드립니다.' / '로고 제작 서비스를 제공합니다.'`,
  },
  'Market Place': {
    label: 'Market Place란?',
    mainText: '완성된 과제물과 창의적인 제품을 거래하는 공간',
    subText: `ex) '어르신 맞춤형 키오스크 로봇' / '다이어트 식단 관리 앱 개발'`,
  },
} as const;

export const PageSelect = ({
  pageType,
  setPageType,
  showDetail,
  setShowDetail,
}: PageSelectProps) => {
  const toggleDetail = (e: MouseEvent | KeyboardEvent) => {
    e.stopPropagation();
    setShowDetail(!showDetail);
  };

  const detail = PAGE_TYPE_DETAILS[pageType];

  return (
    <div className={`${styles.formGroup} ${styles.pageTypeGroup}`}>
      <div className={styles.labelWrapper}>
        <span id='pageTypeLabel'>
          페이지 설정 <span className={styles.required}>(필수)</span>
        </span>
      </div>

      <div
        className={styles.pageTypeWrapper}
        role='group'
        aria-labelledby='pageTypeLabel'>
        <button
          className={`${styles.pageTypeButton} ${
            pageType === 'Idea Solution' ? styles.active : ''
          }`}
          onClick={() => setPageType('Idea Solution')}>
          Idea Solution
        </button>
        <button
          className={`${styles.pageTypeButton} ${
            pageType === 'Market Place' ? styles.active : ''
          }`}
          onClick={() => setPageType('Market Place')}>
          Market Place
        </button>
      </div>

      <div
        className={`${styles.pageDescription} ${
          showDetail ? styles.detail : ''
        }`}
        onClick={() => setShowDetail(!showDetail)}>
        <div className={styles.header}>
          <span className={styles.descriptionText}>{detail.label}</span>
          <InfoDropdown
            className={styles.infoIcon}
            onClick={toggleDetail}
          />
        </div>
        {showDetail && (
          <div className={styles.detailDescription}>
            <span className={styles.mainText}>{detail.mainText}</span>
            <span className={styles.subText}>{detail.subText}</span>
          </div>
        )}
      </div>
    </div>
  );
};
