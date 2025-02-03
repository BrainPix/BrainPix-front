import {
  ChangeEvent,
  InputHTMLAttributes,
  Dispatch,
  forwardRef,
  useRef,
  useState,
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
  (
    {
      label,
      isEmail = false,
      onChangeEmailDomain = null,
      setEmailDomain,
      errorMessage,
      ...rest
    },
    ref,
  ) => {
    const emailDomainRef = useRef<HTMLInputElement>(null);
    const [inputData, setInputData] = useState('');
    const [selectedEmailDomain, setSelectedEmailDomain] = useState('직접 입력');

    const handleChangeEmailDomainInput = (e: ChangeEvent<HTMLInputElement>) => {
      const inputData = e.target.value;
      setInputData(inputData);
      setEmailDomain?.(inputData);
    };

    const handleChangeEmailDomainSelect = (
      e: ChangeEvent<HTMLSelectElement>,
    ) => {
      const selectedValue = e.target.value;
      setSelectedEmailDomain(selectedValue);
      onChangeEmailDomain?.(e);
      setEmailDomain?.(selectedValue);
    };

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
