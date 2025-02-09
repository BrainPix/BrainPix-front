import styles from './recruitInfo.module.scss';
import { getPaymentDurationLabel } from '../../constants/categoryMapper';

interface RecruitInfoProps {
  recruitmentId: number;
  domain: string;
  occupiedQuantity: number;
  totalQuantity: number;
  price: number;
  paymentDuration: string;
}

const RecruitInfo = ({
  recruitments,
}: {
  recruitments?: RecruitInfoProps[];
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>모집 정보</h1>
        <div className={styles.divider}></div>
      </div>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <span className={styles.column}>모집 단위</span>
          <span className={styles.column}>모집 인원</span>
          <span className={styles.column}>보수 금액 (형태)</span>
        </div>
        {recruitments?.map((recruitment) => (
          <div
            key={recruitment.recruitmentId}
            className={styles.recruitmentRow}>
            <div className={styles.cell}>{recruitment.domain}</div>
            <div className={styles.cell}>
              {recruitment.occupiedQuantity} / {recruitment.totalQuantity}
            </div>
            <div className={styles.cell}>
              {recruitment.price.toLocaleString()}원 (
              {getPaymentDurationLabel(recruitment.paymentDuration)})
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecruitInfo;
