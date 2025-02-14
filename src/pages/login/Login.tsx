import { useContext, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import classNames from 'classnames';
import styles from './login.module.scss';
import { useMutation } from '@tanstack/react-query';

import { loginRegisters } from '../../constants/registers';
import { postLogin } from '../../apis/authAPI';
import { LoginPayload } from '../../types/authType';
import Delete from '../../assets/icons/delete.svg?react';
import EyeNonVisible from '../../assets/icons/eyeNonVisible.svg?react';
import EyeVisible from '../../assets/icons/eyeVisible.svg?react';
import { ToastContext } from '../../contexts/toastContext';

interface LoginPropsType {
  userType: 'personal' | 'corparate';
}

export const Login = ({ userType }: LoginPropsType) => {
  const [member, setMember] = useState<'personal' | 'corparate'>(userType);
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const { errorToast, successToast } = useContext(ToastContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({ mode: 'onSubmit' });

  const { mutate: loginMutate } = useMutation({
    mutationFn: (formData: LoginPayload) => postLogin(formData),
    onSuccess: (response) => {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('myType', userType);
      successToast('로그인에 성공하였습니다.');
      setTimeout(() => (location.href = '/idea-market'), 2000);
    },
    onError: () => {
      errorToast('로그인에 실패하였습니다.');
    },
  });

  const handleSubmitHandler: SubmitHandler<FieldValues> = (payload) => {
    const { id, password } = payload;
    const requestBody = { id, password };
    loginMutate(requestBody);
  };

  const registers = loginRegisters(register);

  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(styles.logo)}>로고</div>
      <h1 className={classNames(styles.title)}>로그인</h1>
      <div className={classNames(styles.loginContainer)}>
        <div className={classNames(styles.buttonWrapper)}>
          <button
            className={classNames(styles.memberButton, {
              [styles.clicked]: member === 'personal',
            })}
            onClick={() => setMember('personal')}>
            개인 회원
          </button>
          <button
            className={classNames(styles.memberButton, {
              [styles.clicked]: member === 'corparate',
            })}
            onClick={() => setMember('corparate')}>
            기업 회원
          </button>
        </div>
        <div
          className={classNames(
            styles.inputContainer,
            member === 'corparate' ? styles.right : styles.left,
          )}>
          <form
            onSubmit={handleSubmit(handleSubmitHandler)}
            className={classNames(styles.form)}>
            <div className={classNames(styles.inputWrapper)}>
              <h3 className={classNames(styles.label)}>아이디</h3>
              <input
                className={classNames(styles.input, {
                  [styles.error]: errors.id,
                })}
                placeholder={
                  errors.id ? '아이디를 입력해주세요.' : '아이디 입력'
                }
                type='text'
                id='id'
                {...registers.id}
              />
              {watch('id') !== '' && (
                <button
                  className={classNames(styles.deleteIconWrapper)}
                  onClick={() => setValue('id', '')}>
                  <Delete
                    width={8}
                    className={classNames(styles.icon)}
                    stroke='#424242'
                  />
                </button>
              )}
            </div>
            <div className={classNames(styles.inputWrapper)}>
              <h3 className={classNames(styles.label)}>비밀번호</h3>
              <input
                className={classNames(styles.input, {
                  [styles.error]: errors.password,
                })}
                placeholder={
                  errors.password ? '비밀번호를 입력해주세요' : '비밀번호 입력'
                }
                type={isVisiblePassword ? 'text' : 'password'}
                id='password'
                {...registers.password}
              />
              {watch('password') !== '' && (
                <>
                  {isVisiblePassword ? (
                    <EyeNonVisible
                      className={classNames(styles.eyeIcon)}
                      onClick={() => setIsVisiblePassword(false)}
                    />
                  ) : (
                    <EyeVisible
                      className={classNames(styles.eyeIcon)}
                      onClick={() => setIsVisiblePassword(true)}
                    />
                  )}
                  <button
                    className={classNames(styles.deleteIconWrapper)}
                    onClick={() => setValue('password', '')}>
                    <Delete
                      width={8}
                      height={8}
                      className={classNames(styles.icon)}
                      stroke='#424242'
                    />
                  </button>
                </>
              )}
            </div>
            <button
              type='submit'
              className={classNames(styles.loginButton)}>
              로그인
            </button>
            <a
              href='/sign-up'
              className={classNames(styles.signUpText)}>
              회원가입하기
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};
