import React from 'react';
import styles from './ConfirmModal.module.scss';

interface ConfirmModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <div className={styles.modalHeader}>
          <p className={styles.modalText}>
            등록 완료 시 모집 분야 및 인원 설정이 불가합니다.
            <br />
            정말 등록 하시겠습니까?
          </p>
        </div>
        <div className={styles.modalButtons}>
          <button
            onClick={onCancel}
            className={styles.cancelButton}>
            아니오
          </button>
          <button
            onClick={onConfirm}
            className={styles.confirmButton}>
            네
          </button>
        </div>
      </div>
    </div>
  );
};
