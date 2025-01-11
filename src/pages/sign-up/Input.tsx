import { InputHTMLAttributes } from 'react';
import styles from './input.module.scss';
import classNames from 'classnames';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: 'default' | 'email';
}

export const Input = ({ label, type = 'default', ...rest }: InputProps) => {
  return (
    <div className={classNames(styles.inputWrapper)}>
      <p>{label}</p>
      {type === 'default' && <input {...rest} />}
    </div>
  );
};
