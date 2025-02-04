import { InputHTMLAttributes, forwardRef } from 'react';
import styles from './input.module.scss';
import classNames from 'classnames';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isEmail?: boolean;
  errorMessage?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, isEmail = false, errorMessage, children, ...rest }, ref) => {
    return (
      <div className={classNames(styles.container)}>
        {label && <p className={classNames(styles.label)}>{label}</p>}
        <div className={classNames(styles.rowContainer)}>
          <div>
            <input
              className={classNames(styles.defaultInput)}
              ref={ref}
              {...rest}
            />
            {errorMessage && (
              <p className={classNames(styles.errorMessage)}>{errorMessage}</p>
            )}
          </div>
          {isEmail && <> {children}</>}
        </div>
      </div>
    );
  },
);

Input.displayName = 'Input';
