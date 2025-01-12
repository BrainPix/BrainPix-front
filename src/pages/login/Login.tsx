import { useState } from 'react';
import classNames from 'classnames';
import EyeVisible from '../../assets/icons/eyeVisible.svg?react';
import EyeNonVisible from '../../assets/icons/eyeNonVisible.svg?react';
import styles from './login.module.scss';

export const Login = () => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [member, setMember] = useState<'individual' | 'corparate'>(
    'individual',
  );

  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(styles.logo)}>로고</div>
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
          <form className={classNames(styles.form)}>
            <label
              htmlFor='id'
              className={classNames(styles.label)}>
              아이디
            </label>
            <input
              className={classNames(styles.input)}
              placeholder='아이디 입력'
              type='text'
              name='id'
              id='id'
            />
            <label
              htmlFor='password'
              className={classNames(styles.label)}>
              비밀번호
              {isVisiblePassword ? (
                <EyeVisible
                  onClick={() => setIsVisiblePassword(false)}
                  className={classNames(styles.eyeIcon)}
                />
              ) : (
                <EyeNonVisible
                  onClick={() => setIsVisiblePassword(true)}
                  className={classNames(styles.eyeIcon)}
                />
              )}
            </label>
            <input
              className={classNames(styles.input)}
              placeholder='비밀번호 입력'
              type='password'
              name='password'
              id='password'
            />
            <button className={classNames(styles.loginButton)}>로그인</button>
            <a
              href='/sign-up'
              className={classNames(styles.signUpText)}>
              회원가입
            </a>
          </form>
        </div>
      </div>
    </div>
  );
};
