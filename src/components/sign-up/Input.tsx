import { InputHTMLAttributes, forwardRef, useState } from 'react';
import styles from './input.module.scss';
import classNames from 'classnames';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isEmail?: boolean;
  errorMessage?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, isEmail = false, errorMessage, children, ...rest }, ref) => {
    const [initShake, setInitShake] = useState(false);

    return (
      <div className={classNames(styles.container)}>
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
          </div>
          {isEmail && <> {children}</>}
        </div>
      </div>
    );
  },
);

Input.displayName = 'Input';
