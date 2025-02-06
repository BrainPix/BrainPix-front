import { useState, useEffect } from 'react';
import styles from './supportModal.module.scss';
import ArrowIcon from '../../assets/icons/arrowUp2Thin.svg?react';
import CheckLightIcon from '../../assets/icons/checkLight.svg?react';
import ApplyIcon from '../../assets/icons/apply.svg?react';
import UnapplyIcon from '../../assets/icons/unapply.svg?react';

interface CollaborationSupportModalProps {
  onClose: () => void;
}

export const CollaborationSupportModal = ({
  onClose,
}: CollaborationSupportModalProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [selectedSupport, setSelectedSupport] = useState<string | null>(null);

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

  const handleSupportSelection = (id: string) => {
    setSelectedSupport((prev) => (prev === id ? null : id));
  };

  return (
    <div
      className={styles.overlay}
      onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h1 className={styles.title}>협업 광장 지원</h1>
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
              <h2>SY TECH</h2>
              <h1>Web 서비스 제안</h1>
            </div>
          </div>
          <h2 className={styles.sectionTitle}>지원 부문</h2>
          <hr className={styles.divider} />
          <div className={styles.supportTable}>
            <div className={styles.tableHeader}>
              <span className={styles.column}>지원 분야</span>
              <span className={styles.column}>인원 현황</span>
              <span className={styles.column}>지원</span>
            </div>
            {[
              { id: 'PM', field: 'PM', status: '1 / 1' },
              { id: '디자이너', field: '디자이너', status: '1 / 2' },
            ].map((support) => (
              <div
                key={support.id}
                className={styles.supportRow}>
                <span className={styles.field}>{support.field}</span>
                <span className={styles.status}>{support.status}</span>
                <div
                  className={styles.radioWrapper}
                  onClick={() => handleSupportSelection(support.id)}>
                  {selectedSupport === support.id ? (
                    <ApplyIcon className={styles.radioIcon} />
                  ) : (
                    <UnapplyIcon className={styles.radioIcon} />
                  )}
                </div>
              </div>
            ))}
          </div>

          <h2 className={styles.sectionTitle}>추가 메시지</h2>
          <textarea className={styles.textarea} />
          <div className={styles.footer}>
            <div
              className={styles.checkbox}
              onClick={toggleCheckbox}>
              <div
                className={`${styles.circle} ${isChecked ? styles.checked : ''}`}>
                <CheckLightIcon className={styles.checkIcon} />
              </div>
              <div
                className={`${styles.checkboxLabel} ${isChecked ? styles.checkedLabel : ''}`}>
                프로필 공개
              </div>
            </div>

            <div className={styles.footerButtons}>
              <button
                className={styles.cancelButton}
                onClick={onClose}>
                닫기
              </button>
              <button className={styles.submitButton}>지원하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
