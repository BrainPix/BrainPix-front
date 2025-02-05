import { InputHTMLAttributes, forwardRef, useState } from 'react';
import styles from './input.module.scss';
import classNames from 'classnames';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isEmail?: boolean;
  errorMessage?: string;
  successMessage?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    { label, isEmail = false, errorMessage, successMessage, children, ...rest },
    ref,
  ) => {
    const [initShake, setInitShake] = useState(false);

    return (
      <div className={classNames(label ? styles.container : styles.noPadding)}>
        {label && <p className={classNames(styles.label)}>{label}</p>}
        <div className={classNames(styles.rowContainer)}>
          <div>
            <input
              {...rest}
              className={classNames(styles.defaultInput)}
              ref={ref}
              onFocus={() => setInitShake(false)}
              onBlur={(e) => {
                setInitShake(true);
                if (rest.onBlur) {
                  rest.onBlur(e);
                }
              }}
            />
            {errorMessage && (
              <p
                className={classNames(styles.errorMessage, {
                  [styles.shake]: initShake,
                })}>
                {errorMessage}
              </p>
            )}
            {successMessage && (
              <p
                className={classNames(styles.successMessage, {
                  [styles.shake]: initShake,
                })}>
                {successMessage}
              </p>
            )}
          </div>
          {isEmail && <> {children}</>}
        </div>
      </div>
    );
  },
);

Input.displayName = 'Input';
