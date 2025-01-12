import { InputHTMLAttributes } from 'react';
import styles from './input.module.scss';
import classNames from 'classnames';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: 'default' | 'email';
}

export const Input = ({ label, type = 'default', ...rest }: InputProps) => {
  return (
    <div className={classNames(styles.container)}>
      {label && <p>{label}</p>}
      {type === 'default' && (
        <input
          className={classNames(styles.defaultInput)}
          {...rest}
        />
      )}
      {type === 'email' && (
        <div>
          <div className={classNames(styles.emailInputContainer)}>
            <div className={classNames(styles.emailWrapper)}>
              <input /> @ <input />
            </div>
            <div className={classNames(styles.dropDown)}>직접입력</div>
          </div>
          <div className={classNames(styles.emailInputContainer)}>
            <div className={classNames(styles.emailWrapper)}>
              <input />
            </div>
            <button className={classNames(styles.requestButton)}>
              인증요청
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
