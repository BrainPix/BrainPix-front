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
              <button className={styles.button}>수락</button>
              <button className={styles.button}>거절</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
