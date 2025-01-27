import classNames from 'classnames';
import styles from './infoInput.module.scss';
import Dropdown from '../dropdown/Dropdown';
import { HTMLAttributes } from 'react';

interface InfoInputProps extends HTMLAttributes<HTMLDivElement> {
  customClassName?: string;
}

export const InfoInput = ({ customClassName }: InfoInputProps) => {
  const LABEL_OPTIONS = ['연락처', '노션', '깃허브'];

  return (
    <div className={classNames(styles.container, customClassName)}>
      <Dropdown
        options={LABEL_OPTIONS}
        customClassName={classNames(styles.dropdown)}
      />
      <input className={classNames(styles.input)} />
      <div className={classNames(styles.publicCheckWrapper)}>
        <input
          type='checkbox'
          className={classNames(styles.checkbox)}
        />
        공개여부
      </div>
    </div>
  );
};
