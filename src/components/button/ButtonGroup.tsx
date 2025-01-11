import React from 'react';
import styles from './buttonGroup.module.scss';
import { useNavigate } from 'react-router-dom';

interface ButtonGroupProps {
  onCancel?: () => void;
  onSubmit?: () => void;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ onCancel, onSubmit }) => {
  const navigate = useNavigate();

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      navigate(-1); //기본 동작 -> 이전페이지 이동
      console.log('취소 버튼 클릭');
    }
  };

  const handleSubmit = () => {
    if (onSubmit) {
      onSubmit();
    } else {
      // 등록 완료 페이지로 이동
      // navigate('/success'); // 등록 완료 페이지 경로 설정 필요
      console.log('등록 완료 페이지로 이동');
    }
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
