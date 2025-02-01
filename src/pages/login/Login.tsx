import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import classNames from 'classnames';
import styles from './login.module.scss';
import { loginRegisters } from '../../constants/registers';

interface LoginPropsType {
  userType: 'individual' | 'corparate';
}

export const Login = ({ userType }: LoginPropsType) => {
  const [member, setMember] = useState<'individual' | 'corparate'>(userType);

  const { register, handleSubmit } = useForm({ mode: 'onSubmit' });

  const handleSubmitHandler: SubmitHandler<FieldValues> = (payload) => {
    console.log(payload);
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
              [styles.clicked]: member === 'individual',
            })}
            onClick={() => setMember('individual')}>
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
            <div>
              <h3 className={classNames(styles.label)}>아이디</h3>
              <input
                className={classNames(styles.input)}
                placeholder='아이디 입력'
                type='text'
                id='id'
                {...registers.id}
              />
            </div>
            <div>
              <h3 className={classNames(styles.label)}>비밀번호</h3>
              <input
                className={classNames(styles.input)}
                placeholder='비밀번호 입력'
                id='password'
                {...registers.password}
              />
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
