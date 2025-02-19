import classNames from 'classnames';
import styles from './stepTwo.module.scss';
import {
  FieldErrors,
  FieldValues,
  UseFormGetFieldState,
  UseFormRegisterReturn,
  UseFormWatch,
} from 'react-hook-form';

import { Input } from './Input';
import { useMutation } from '@tanstack/react-query';
import { postEmailCode, postEmailCodeNumber } from '../../apis/authAPI';
import { useContext, useRef, useState } from 'react';
import { EmailCodePayload } from '../../types/authType';
import { ToastContext } from '../../contexts/toastContext';
import Loading from '../../assets/icons/loading.svg?react';

interface StepTwoPropType {
  registers: Record<string, UseFormRegisterReturn>;
  errors: FieldErrors<FieldValues>;
  userType: 'personal' | 'corporate';
  isValid: boolean;
  fieldState: UseFormGetFieldState<FieldValues>;
  watch: UseFormWatch<FieldValues>;
}

export const StepTwo = ({
  registers,
  errors,
  isValid,
  userType,
  fieldState,
  watch,
}: StepTwoPropType) => {
  const emailCodeInputRef = useRef<HTMLInputElement>(null);
  const [emailCheckResult, setEmailCheckResult] = useState<
    '성공' | '실패' | '대기' | null
  >(null);
  const [sendEmailButtonText, setSendEmailButtonText] = useState<
    '인증' | '재전송'
  >('인증');
  const [initNameShake, setInitNameShake] = useState(false);
  const [initBirthShake, setInitBirthShake] = useState(false);

  const { errorToast } = useContext(ToastContext);

  const { mutate: emailCheckMutation, isPending: isSignupLoading } =
    useMutation({
      mutationFn: (email: string) => postEmailCode(email),
      onError: () => {
        setSendEmailButtonText('재전송');
        errorToast('오류가 발생하였습니다. 이메일을 다시 확인해주세요.');
      },
      onSuccess: () => {
        setEmailCheckResult('대기');
        setSendEmailButtonText('재전송');
      },
    });

  const { mutate: emailCheckCodeMutation } = useMutation({
    mutationFn: (payload: EmailCodePayload) => postEmailCodeNumber(payload),
    onError: () => setEmailCheckResult('실패'),
    onSuccess: (response) => {
      setEmailCheckResult('성공');
      localStorage.setItem('signupToken', response.data.token);
    },
  });

  const handleClickEmailCodeCheckButton = () => {
    if (!emailCodeInputRef.current) {
      return;
    }
    const requestBody = {
      email: watch('email'),
      authCode: emailCodeInputRef.current.value,
    };
    emailCheckCodeMutation(requestBody);
  };

  return (
    <div>
      <div className={classNames(styles.headlineWrapper)}>
        <h2 className={classNames(styles.main)}>회원 정보 입력하기</h2>
        <h3 className={classNames(styles.sub)}>이제 마지막 단계예요!</h3>
      </div>
      <div className={classNames(styles.form)}>
        <div>
          <div className={classNames(styles.inputContainer)}>
            <div className={classNames(styles.rowContainer)}>
              <div
                onFocus={() => setInitNameShake(false)}
                onBlur={() => setInitNameShake(true)}>
                <Input
                  label={userType === 'personal' ? '이름' : '담당자 이름'}
                  placeholder='이름 입력'
                  type='text'
                  {...registers.name}
                />
              </div>
              <div
                onFocus={() => setInitBirthShake(false)}
                onBlur={() => setInitBirthShake(true)}>
                <Input
                  label='생년월일'
                  placeholder='2025/01/01'
                  type='text'
                  maxLength={10}
                  {...registers.birth}
                />
              </div>
            </div>
            <div className={classNames(styles.errorMessage)}>
              <p
                className={classNames(styles.name, {
                  [styles.shake]: initNameShake,
                })}>
                {errors.name?.message && String(errors.name?.message)}
              </p>
              <p
                className={classNames(styles.birth, {
                  [styles.shake]: initBirthShake,
                })}>
                {errors.birth?.message && String(errors.birth?.message)}
              </p>
            </div>
            {userType === 'personal' ? (
              <Input
                label='닉네임 입력'
                placeholder='닉네임 입력'
                type='text'
                errorMessage={
                  errors.nickname?.message && String(errors.nickname?.message)
                }
                {...registers.nickname}
              />
            ) : (
              <div className={classNames(styles.inputContainer)}>
                <div className={classNames(styles.rowContainer)}>
                  <Input
                    label='기업 명'
                    placeholder='기업 명 입력'
                    type='text'
                    {...registers.nickname}
                  />
                  <Input
                    label='직책'
                    placeholder='직책 입력'
                    type='text'
                    maxLength={10}
                    {...registers.position}
                  />
                </div>
                <div className={classNames(styles.errorMessage)}>
                  <p className={classNames(styles.name)}>
                    {errors.nickname?.message &&
                      String(errors.nickname?.message)}
                  </p>
                  <p className={classNames(styles.birth)}>
                    {errors.position?.message &&
                      String(errors.position?.message)}
                  </p>
                </div>
              </div>
            )}

            <div className={classNames(styles.emailInputContainer)}>
              <Input
                label='이메일 인증'
                placeholder='이메일 입력'
                type='email'
                isEmail
                errorMessage={
                  errors.email?.message && String(errors.email?.message)
                }
                {...registers.email}>
                <button
                  onClick={() => {
                    emailCheckMutation(watch('email'));
                  }}
                  disabled={
                    fieldState('email').invalid &&
                    !(emailCheckResult === '실패')
                  }
                  type='button'
                  className={classNames(
                    styles.emailButton,
                    fieldState('email').invalid &&
                      !(emailCheckResult === '실패')
                      ? 'buttonFilled-grey500'
                      : 'buttonFilled-grey900',
                  )}>
                  {sendEmailButtonText}
                </button>
              </Input>
              {!!emailCheckResult && (
                <Input
                  ref={emailCodeInputRef}
                  placeholder='인증 코드 입력'
                  type='text'
                  isEmail
                  errorMessage={
                    (emailCheckResult === '실패' && '인증에 실패하였습니다.') ||
                    ''
                  }
                  successMessage={
                    emailCheckResult === '성공' ? '인증되었습니다.' : ''
                  }>
                  <button
                    onClick={handleClickEmailCodeCheckButton}
                    type='button'
                    className={classNames(
                      styles.emailButton,
                      'buttonFilled-grey800',
                    )}>
                    인증
                  </button>
                </Input>
              )}
            </div>
          </div>
        </div>
        <button
          disabled={!isValid && emailCheckResult !== '성공'}
          className={classNames(
            styles.submitButton,
            isValid && emailCheckResult === '성공'
              ? 'buttonFilled-grey900'
              : 'buttonFilled-grey500',
          )}
          type='submit'>
          {isSignupLoading ? (
            <Loading
              width={20}
              height={20}
            />
          ) : (
            '완료'
          )}
        </button>
      </div>
    </div>
  );
};
