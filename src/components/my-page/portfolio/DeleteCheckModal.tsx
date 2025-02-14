import classNames from 'classnames';
import styles from './deleteCheckModal.module.scss';

interface DeleteCheckModalPropsType {
  onDelete: () => void;
  onCancle: () => void;
}

export const DeleteCheckModal = ({
  onDelete,
  onCancle,
}: DeleteCheckModalPropsType) => {
  return (
    <div className={classNames(styles.modalContainer)}>
      <div className={classNames(styles.container)}>
        <h1 className={classNames(styles.title)}>정말로 삭제하시겠습니까?</h1>
        <div className={classNames(styles.buttonWrapper)}>
          <button onClick={onDelete}>네</button>
          <button onClick={onCancle}>아니요</button>
        </div>
      </div>
    </div>
  );
};
