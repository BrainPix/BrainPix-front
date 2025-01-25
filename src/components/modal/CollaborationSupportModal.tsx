import { useState, useEffect } from 'react';
import styles from './supportModal.module.scss';
import ArrowIcon from '../../assets/icons/arrowUp2Thin.svg?react';
import EllipseGray from '../../assets/icons/ellipseGray.svg?react';
import EllipseBlue from '../../assets/icons/ellipseBlue.svg?react';
import CheckLightIcon from '../../assets/icons/checkLight.svg?react';

interface CollaborationSupportModalProps {
  onClose: () => void;
}

const CollaborationSupportModal = ({
  onClose,
}: CollaborationSupportModalProps) => {
  const [isChecked, setIsChecked] = useState(false);

  useEffect(() => {
    // 모달이 열리면 body 스크롤 비활성화
    document.body.style.overflow = 'hidden';
    return () => {
      // 모달이 닫히면 body 스크롤 활성화
      document.body.style.overflow = 'auto';
    };
  }, []);

  const toggleCheckbox = () => {
    setIsChecked((prev) => !prev);
  };

  return (
    <div
      className={styles.overlay}
      onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h1 className={styles.title}>요청과제 지원</h1>
          <button
            className={styles.closeButton}
            onClick={onClose}>
            ✕
          </button>
        </div>
        <hr className={styles.divider} />
        <div className={styles.content}>
          <div className={styles.titleSection}>
            <div className={styles.breadcrumb}>
              <span>요청과제</span>
              <ArrowIcon className={styles.arrowIcon} />
              <span>디자인</span>
            </div>
            <div className={styles.companyInfo}>
              <h2>(주) 어쩌구저쩌구</h2>
              <h1>Web 서비스 제안</h1>
            </div>
          </div>
          <h2 className={styles.sectionTitle}>지원 부문</h2>
          <hr className={styles.divider} />
          <div className={styles.supportSection}>
            <div className={`${styles.row} ${styles.headerRow}`}>
              <span className={styles.columnTitle}>지원분야</span>
              <span className={styles.columnTitle}>인원 현황</span>
              <span className={styles.columnTitle}>지원</span>
            </div>
            <div className={styles.row}>
              <span className={styles.field}>PM</span>
              <span className={styles.status}>1 / 1</span>
              <div className={styles.radioWrapper}>
                <input
                  type='radio'
                  name='support'
                  className={styles.radio}
                />
              </div>
            </div>
            <div className={styles.row}>
              <span className={styles.field}>디자이너</span>
              <span className={styles.status}>1 / 2</span>
              <div className={styles.radioWrapper}>
                <input
                  type='radio'
                  name='support'
                  className={styles.radio}
                />
              </div>
            </div>
          </div>

          <div
            className={styles.checkbox}
            onClick={toggleCheckbox}>
            <div className={styles.circle}>
              <EllipseGray
                className={styles.checkBackground}
                style={{ display: isChecked ? 'none' : 'block' }}
              />
              <EllipseBlue
                className={styles.checkBackground}
                style={{ display: isChecked ? 'block' : 'none' }}
              />
              <CheckLightIcon className={styles.checkIcon} />
            </div>
            <label
              htmlFor='portfolio'
              className={styles.checkboxLabel}>
              자기소개 및 포트폴리오 공개
            </label>
          </div>

          <h2 className={styles.sectionTitle}>추가 메시지</h2>
          <textarea className={styles.textarea} />
          <button className={styles.submitButton}>지원하기</button>
        </div>
      </div>
    </div>
  );
};

export default CollaborationSupportModal;
