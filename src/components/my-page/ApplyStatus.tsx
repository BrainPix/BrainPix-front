import { postAcceptApplication } from '../../apis/postManagementAPI';
import styles from './applyStatus.module.scss';

interface ApplyStatusProps {
  applicationStatus: {
    applicantId: string;
    role: string;
    approvedCount: number;
    totalCount: number;
    purchasingId?: number;
  }[];
}

export const ApplyStatus = ({ applicationStatus }: ApplyStatusProps) => {
  // const APPLY_RECORDS = [
  //   { id: 'drerwr', role: '디자이너', current: 1, total: 4 },
  // ];
  {
    console.log('지원 현황: ', applicationStatus);
  }

  const handleAccept = async (purchasingId?: number) => {
    if (!purchasingId) {
      console.error('purchasingId가 없습니다.');
      return;
    }

    try {
      await postAcceptApplication(purchasingId);
      alert('지원이 수락되었습니다.');
      window.location.reload(); // 성공 시 페이지 새로고침 (UI 업데이트)
    } catch (error) {
      console.error('지원 수락 중 오류 발생:', error);
      alert('지원 수락에 실패했습니다.');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.tableTitle}>지원 현황</div>
      <div className={styles.titleDivider} />
      <div className={styles.tableContainer}>
        <div className={styles.tableHeader}>
          <span>아이디</span>
          <span className={styles.divider} />
          <span>역할</span>
          <span className={styles.divider} />
          <span>현재 / 모집</span>
          <span className={styles.divider} />
          <span />
        </div>
        {applicationStatus.map((apply) => (
          <div
            key={apply.applicantId}
            className={styles.tableRow}>
            <span>{apply.applicantId}</span>
            <span className={styles.divider} />
            <span>{apply.role}</span>
            <span className={styles.divider} />
            <span>
              {apply.approvedCount} / {apply.totalCount}
            </span>
            <span className={styles.divider} />
            <div className={styles.buttonGroup}>
              <button
                className={styles.button}
                onClick={() => handleAccept(apply.purchasingId)}>
                수락
              </button>
              <button className={styles.button}>거절</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
