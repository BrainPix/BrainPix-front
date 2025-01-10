import styles from './buttonGroup.module.scss';

interface ButtonGroupProps {
    onCancel: () => void;
    onSubmit: () => void;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ onCancel, onSubmit }) => {
    return (
        <div className={styles.buttonGroup}>
            <button className={styles.cancelButton} onClick={onCancel}>
                취소
            </button>
            <button className={styles.submitButton} onClick={onSubmit}>
                등록
            </button>
        </div>
    );
};

export default ButtonGroup;
