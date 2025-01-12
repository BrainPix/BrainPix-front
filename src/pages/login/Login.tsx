import classNames from 'classnames';
import styles from './login.module.scss';

import EyeVisible from '../../assets/icons/eyeVisible.svg?react';
// import EyeNonVisible from '../../assets/icons/eyeNonVisible.svg?react';

export const Login = () => {
  // const [isVisiblePassword, setIsVisiblePassword]
  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(styles.logo)}>로고</div>
      <div className={classNames(styles.loginContainer)}>
        <div className={classNames(styles.buttonWrapper)}>
          <button className={classNames(styles.memberButton)}>개인 회원</button>
          <button className={classNames(styles.memberButton, styles.clicked)}>
            기업 회원
          </button>
        </div>
        <div className={classNames(styles.inputContainer, styles.right)}>
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
              <EyeVisible className={classNames(styles.eyeIcon)} />
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
