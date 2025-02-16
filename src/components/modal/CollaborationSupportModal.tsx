import { useEffect } from 'react';
import styles from './supportModal.module.scss';
import ArrowIcon from '../../assets/icons/arrowUp2Thin.svg?react';
import CheckLightIcon from '../../assets/icons/checkLight.svg?react';
import ApplyIcon from '../../assets/icons/apply.svg?react';
import UnapplyIcon from '../../assets/icons/unapply.svg?react';
import { getCategoryLabel } from '../../utils/categoryMapping';
import { useMutation } from '@tanstack/react-query';
import { applyForCollaboration } from '../../apis/applyAPI';
import axios from 'axios';
import { useCollaborationSupport } from '../../hooks/useCollaborationSupport';

interface CollaborationSupportModalProps {
  onClose: () => void;
  recruitments: {
    recruitmentId: number;
    domain: string;
    occupiedQuantity: number;
    totalQuantity: number;
  }[];
  category: string;
  writerName: string;
  title: string;
  collaborationId: number;
}

export const CollaborationSupportModal = ({
  onClose,
  recruitments,
  category,
  writerName,
  title,
  collaborationId,
}: CollaborationSupportModalProps) => {
  const {
    selectedSupport,
    message,
    isChecked,
    toggleCheckbox,
    handleSupportSelection,
    setMessage,
    navigate,
  } = useCollaborationSupport();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  const mutation = useMutation({
    mutationFn: async () => {
      if (!collaborationId) {
        alert('협업 게시글 ID가 없습니다. 다시 시도해주세요.');
        return Promise.reject('collaborationId is missing');
      }

      if (!selectedSupport) {
        alert('지원할 모집 부문을 선택해주세요.');
        return Promise.reject('지원할 모집 부문을 선택해주세요.');
      }

      const requestData = {
        collaborationRecruitmentId: selectedSupport,
        isOpenProfile: isChecked,
        message,
      };
      return applyForCollaboration(collaborationId, requestData);
    },
    onSuccess: () => {
      alert('지원이 완료되었습니다!');
      onClose();
      navigate('/collaboration');
    },
    onError: (error: unknown) => {
      console.error('지원 요청 실패:', error);

      let errorMessage = '지원 요청 중 오류가 발생했습니다.';

      if (axios.isAxiosError(error)) {
        errorMessage = error.response?.data?.message || errorMessage;
      }

      if (errorMessage.includes('이미 신청한 분야')) {
        alert('⚠ 이미 신청함');
      } else {
        alert(`${errorMessage}`);
      }
    },
  });

  const handleSubmit = () => {
    if (!selectedSupport) {
      alert('지원할 모집 부문을 선택해주세요.');
      return;
    }
    mutation.mutate();
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
              <span>협업 광장</span>
              <ArrowIcon className={styles.arrowIcon} />
              <span>{getCategoryLabel(category)}</span>
            </div>
            <div className={styles.companyInfo}>
              <h2>{writerName}</h2>
              <h1>{title}</h1>
            </div>
          </div>
          <h2 className={styles.sectionTitle}>지원 부문</h2>
          <hr className={styles.divider} />
          {recruitments.length === 0 ? (
            <p className={styles.noRecruitments}>
              지원할 모집 부문이 없습니다.
            </p>
          ) : (
            <div className={styles.supportTable}>
              <div className={styles.tableHeader}>
                <span className={styles.column}>지원 분야</span>
                <span className={styles.column}>인원 현황</span>
                <span className={styles.column}>지원</span>
              </div>
              {recruitments.map((recruitment) => (
                <div
                  key={recruitment.recruitmentId}
                  className={styles.supportRow}>
                  <span className={styles.field}>{recruitment.domain}</span>
                  <span className={styles.status}>
                    {recruitment.occupiedQuantity} / {recruitment.totalQuantity}
                  </span>
                  <div
                    className={styles.radioWrapper}
                    onClick={() =>
                      handleSupportSelection(recruitment.recruitmentId)
                    }>
                    {selectedSupport === recruitment.recruitmentId ? (
                      <ApplyIcon className={styles.radioIcon} />
                    ) : (
                      <UnapplyIcon className={styles.radioIcon} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          <h2 className={styles.sectionTitle}>추가 메시지</h2>
          <textarea
            className={styles.textarea}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder='지원 동기 및 추가 메시지를 입력하세요.'
          />
          <div className={styles.footer}>
            <div
              className={styles.checkbox}
              onClick={toggleCheckbox}>
              <div
                className={`${styles.circle} ${isChecked ? styles.checked : ''}`}>
                <CheckLightIcon className={styles.checkIcon} />
              </div>
              <div
                className={`${styles.checkboxLabel} ${
                  isChecked ? styles.checkedLabel : ''
                }`}>
                프로필 공개
              </div>
            </div>

            <div className={styles.footerButtons}>
              <button
                className={styles.cancelButton}
                onClick={onClose}>
                닫기
              </button>
              <button
                className={styles.submitButton}
                onClick={handleSubmit}
                disabled={mutation.isPending || !selectedSupport}>
                {mutation.isPending ? '지원 중...' : '지원하기'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
