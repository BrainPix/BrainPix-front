import { useNavigate } from 'react-router-dom';
import styles from './buttonGroup.module.scss';

interface ButtonGroupProps {
  onCancel?: () => void;
  onSubmit?: () => void;
}

const ButtonGroup = ({ onCancel, onSubmit }: ButtonGroupProps) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
      return;
    }
    navigate(-1); // 기본 동작 -> 이전 페이지 이동
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit();
      return;
    }
    // 등록 완료 페이지로 이동
    // navigate('/success'); // 등록 완료 페이지 경로 설정 필요
  };

  return (
    <div className={styles.buttonGroup}>
      <button
        className={styles.cancelButton}
        onClick={handleCancel}>
        취소
      </button>
      <button
        className={styles.submitButton}
        onClick={handleSubmit}>
        등록
      </button>
    </div>
  );
};

export default ButtonGroup;
