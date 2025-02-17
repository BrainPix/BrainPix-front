import {
  postAcceptRequestApplication,
  postRejectRequestApplication,
  postAcceptCollaborationApplication,
  postRejectCollaborationApplication,
} from '../../apis/postManagementAPI';
import styles from './applyStatus.module.scss';

interface ApplyStatusProps {
  applicationStatus: {
    applicantId: string;
    role: string;
    approvedCount: number;
    totalCount: number;
    purchasingId?: number;
    gatheringId?: number;
  }[];
  postType: 'request-task' | 'collaboration';
}

export const ApplyStatus = ({
  applicationStatus,
  postType,
}: ApplyStatusProps) => {
  // const APPLY_RECORDS = [
  //   { id: 'drerwr', role: '디자이너', current: 1, total: 4 },
  // ];
  {
  }

  const handleAccept = async (id?: number) => {
    if (!id) {
      return;
    }

    try {
      if (postType === 'request-task') {
        await postAcceptRequestApplication(id);
      } else {
        await postAcceptCollaborationApplication(id);
      }
      alert('요청 과제의 지원이 수락되었습니다.');
      window.location.reload(); // 성공 시 새로고침
    } catch {
      alert('요청 과제의 지원 수락에 실패했습니다.');
    }
  };

  const handleReject = async (id?: number) => {
    if (!id) {
      return;
    }

    try {
      if (postType === 'request-task') {
        await postRejectRequestApplication(id);
      } else {
        await postRejectCollaborationApplication(id);
      }
      alert('협업 광장의 지원이 거절되었습니다.');
      window.location.reload(); // 성공 시 새로고침
    } catch {
      alert('협업 광장의 지원 거절에 실패했습니다.');
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
                onClick={() =>
                  handleAccept(
                    postType === 'request-task'
                      ? apply.purchasingId
                      : apply.gatheringId,
                  )
                }>
                수락
              </button>
              <button
                className={styles.button}
                onClick={() =>
                  handleReject(
                    postType === 'request-task'
                      ? apply.purchasingId
                      : apply.gatheringId,
                  )
                }>
                거절
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
