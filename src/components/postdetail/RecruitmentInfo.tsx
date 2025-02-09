import styles from './recruitmentInfo.module.scss';

interface RecruitmentInfoProps {
  recruitments: {
    domain: string;
    occupiedQuantity: number;
    totalQuantity: number;
  }[];
}

const RecruitmentInfo = ({ recruitments }: RecruitmentInfoProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>모집 정보</h1>
        <div className={styles.divider}></div>
      </div>

      {recruitments.length === 0 ? (
        <p className={styles.noRecruitment}>현재 모집 중인 인원이 없습니다.</p>
      ) : (
        <>
          <div className={styles.tableHeader}>
            <span className={styles.column}>모집 단위</span>
            <span className={styles.column}>모집 인원</span>
          </div>

          <div className={styles.recruitmentTable}>
            {recruitments.map((unit, index) => (
              <div
                key={index}
                className={styles.recruitmentRow}>
                <span className={styles.role}>{unit.domain}</span>
                <span className={styles.count}>
                  {unit.occupiedQuantity} / {unit.totalQuantity}
                </span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default RecruitmentInfo;
