import styles from './cardHeader.module.scss';
import Label from '../../common/label/Label';
import { isValidLabelType } from '../../../utils/isValidLabelType';

interface CardHeaderProps {
  date: string;
  status: string;
  statusType: string;
  cardTitle?: string;
  showDeleteButton?: boolean;
}

export const CardHeader = ({
  date,
  status,
  statusType,
  cardTitle,
  showDeleteButton,
}: CardHeaderProps) => {
  return (
    <>
      <div className={styles.cardHeader}>
        <span>
          <Label
            text={status}
            type={isValidLabelType(statusType) ? statusType : 'reject'}
          />
        </span>
        <div className={styles.dateContainer}>
          <span className={styles.date}>{date}</span>
          {showDeleteButton && (
            <>
              <div className={styles.divider} />
              <button className={styles.deleteButton}>삭제</button>
            </>
          )}
        </div>
      </div>

      {cardTitle && <div className={styles.cardTitle}>{cardTitle}</div>}
    </>
  );
};
