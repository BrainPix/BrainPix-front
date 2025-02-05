import classNames from 'classnames';
import styles from './toast.module.scss';

import Delete from '../../../assets/icons/delete.svg?react';
import Error from '../../../assets/icons/error.svg?react';
import Check from '../../../assets/icons/checkInCicle.svg?react';
import Info from '../../../assets/icons/infoInCircle.svg?react';
import { useContext } from 'react';
import { ToastContext } from '../../../contexts/toastContext';

interface ToastPropsType {
  text: string;
  type?: 'default' | 'error' | 'success';
}

export const Toast = ({ text, type = 'default' }: ToastPropsType) => {
  const { closeToast } = useContext(ToastContext);
  return (
    <div className={classNames(styles.toastContainer, [styles[type]])}>
      <div>
        {type === 'error' && (
          <div className={classNames(styles.rowContainer)}>
            <Error className={classNames(styles.errorIcon)} />
            <h3 className={classNames(styles.title)}>{'ERROR'}</h3>
          </div>
        )}
        {type === 'success' && (
          <div className={classNames(styles.rowContainer)}>
            <Check />
            <h3 className={classNames(styles.title)}>{'SUCCESS'}</h3>
          </div>
        )}
        {type === 'default' && (
          <div className={classNames(styles.rowContainer)}>
            <Info />
            <h3 className={classNames(styles.title)}>{'INFO'}</h3>
          </div>
        )}
        <p className={classNames(styles.content)}>{text}</p>
      </div>
      <Delete
        onClick={closeToast}
        stroke='#424242'
        width={15}
        height={15}
        className={classNames(styles.deleteIcon)}
      />
    </div>
  );
};
