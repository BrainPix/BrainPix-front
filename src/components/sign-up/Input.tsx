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
      ...rest
    },
    ref,
  ) => {
    const emailDomainRef = useRef<HTMLInputElement>(null);
    const [inputData, setInputData] = useState('');
    const [selectedEmailDomain, setSelectedEmailDomain] = useState('');

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
        {label && <p>{label}</p>}

        {isEmail ? (
          <div>
            <div className={classNames(styles.emailInputContainer)}>
              <div className={classNames(styles.emailWrapper)}>
                <input
                  ref={ref}
                  className={classNames(styles.defaultInput)}
                  {...rest}
                />
                @
                <input
                  ref={emailDomainRef}
                  value={
                    selectedEmailDomain === '직접 입력'
                      ? inputData
                      : selectedEmailDomain
                  }
                  disabled={selectedEmailDomain !== '직접 입력'}
                  className={classNames(styles.defaultInput)}
                  onChange={handleChangeEmailDomainInput}
                />
              </div>
              <select
                className={classNames(styles.dropDown)}
                onChange={(e) => handleChangeEmailDomainSelect(e)}>
                <option value='naver.com'>naver.com</option>
                <option value='google.com'>google.com</option>
                <option value='hanmail.net'>hanmail.net</option>
                <option value='nate.com'>nate.com</option>
                <option value='kakao.com'>kakao.com</option>
                <option value='직접 입력'>직접 입력</option>
              </select>
            </div>
            <div className={classNames(styles.emailInputContainer)}>
              <div className={classNames(styles.emailWrapper)}>
                <input className={classNames(styles.defaultInput)} />
              </div>
              <button className={classNames(styles.requestButton)}>
                인증요청
              </button>
            </div>
          </div>
        ) : (
          <input
            className={classNames(styles.defaultInput)}
            ref={ref}
            {...rest}
          />
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
