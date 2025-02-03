import {
  ChangeEvent,
  InputHTMLAttributes,
  Dispatch,
  forwardRef,
  SetStateAction,
} from 'react';
import styles from './input.module.scss';
import classNames from 'classnames';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  isEmail?: boolean;
  errorMessage?: string;
  setEmailDomain?: Dispatch<SetStateAction<string>>;
  onChangeEmailDomain?: (e: ChangeEvent<HTMLSelectElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, errorMessage, ...rest }, ref) => {
    return (
      <div className={classNames(styles.container)}>
        {label && <p className={classNames(styles.label)}>{label}</p>}
        <>
          <input
            className={classNames(styles.defaultInput)}
            ref={ref}
            {...rest}
          />
          {errorMessage && (
            <p className={classNames(styles.errorMessage)}>{errorMessage}</p>
          )}
        </>
      </div>
    );
  },
);

Input.displayName = 'Input';
