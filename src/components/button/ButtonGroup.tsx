import styles from './buttonGroup.module.scss';
import { useNavigate } from 'react-router-dom';

interface ButtonGroupProps {
    onCancel?: () => void;
    onSubmit: () => void;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ onCancel, onSubmit }) => {
    const navigate = useNavigate();

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        } else {
            navigate(-1);
            console.log('취소 버튼 클릭');
        }
    };
    
    return (
        <div className={styles.buttonGroup}>
            <button className={styles.cancelButton} onClick={handleCancel}>
                취소
            </button>
            <button className={styles.submitButton} onClick={onSubmit}>
                등록
            </button>
        </div>
    );
};

export default ButtonGroup;
