import styles from './cardHeader.module.scss';
import Label from '../../common/label/Label';

interface CardHeaderProps {
  date: string;
}

export const CardHeader = ({ date }: CardHeaderProps) => {
  return (
    <>
      <div className={styles.cardHeader}>
        <span>
          <Label
            text='구매 완료'
            type='purchaseCompleted'
          />
        </span>
        <span className={styles.date}>{date}</span>
      </div>
      <div className={styles.cardTitle}>구매 상세 내역</div>
    </>
  );
};
