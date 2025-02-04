import styles from './label.module.scss';

interface LabelProps {
  text: string; // 라벨에 표시할 텍스트
  type:
    | 'corporate'
    | 'corporatePublic'
    | 'personal'
    | 'selfOffer'
    | 'purchaseCompleted'
    | 'accept'
    | 'reject';
} // 라벨 타입

const Label = ({ text, type }: LabelProps) => {
  return <div className={`${styles.label} ${styles[type]}`}>{text}</div>;
};

export default Label;
