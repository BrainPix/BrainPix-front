import { ChangeEvent, useEffect, useState } from 'react';
import classNames from 'classnames';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
import { SIGN_UP_ERROR_MESSAGE } from '../../../constants/errorMessage';
import { Input } from '../../../components/sign-up/Input';
import styles from './individualMember.module.scss';

export const IndividualMember = () => {
  // const navigate = useNavigate();
  const [emailDomain, setEmailDomain] = useState('');

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const registers = {
    id: register('id', {
      required: SIGN_UP_ERROR_MESSAGE.id,
      minLength: { value: 6, message: SIGN_UP_ERROR_MESSAGE.id },
      maxLength: { value: 12, message: SIGN_UP_ERROR_MESSAGE.id },
      pattern: {
        value: /^[a-z0-9]+$/,
        message: SIGN_UP_ERROR_MESSAGE.id,
      },
    }),
    password: register('password', {
      required: SIGN_UP_ERROR_MESSAGE.passwordRegex,
      minLength: { value: 8, message: SIGN_UP_ERROR_MESSAGE.passwordLength },
      maxLength: { value: 20, message: SIGN_UP_ERROR_MESSAGE.passwordLength },
      pattern: {
        value: /^(?=.*[a-zA-Z])(?=.*[\d\W_])[a-zA-Z\d\W_]$/,
        message: SIGN_UP_ERROR_MESSAGE.passwordRegex,
      },
    }),
    passwordCheck: register('passwordCheck', {
      validate: (value) => {
        if (watch('password') !== value) {
          return SIGN_UP_ERROR_MESSAGE.passwordCheck;
        }
        return true;
      },
    }),
    name: register('name'),
    birth: register('birth'),
    email: register('email'),
  };

  const handleSubmitHandler: SubmitHandler<FieldValues> = (payload) => {
    const data = { ...payload, email: payload.email + '@' + emailDomain };
    console.log(data);
  };

  const handleChangeEmailDomain = (e: ChangeEvent<HTMLSelectElement>) => {
    setEmailDomain(e.target.value);
  };

  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(styles.logo)}>로고</div>
      <h3 className={classNames(styles.title)}>
        <strong>개인 회원</strong> 가입 정보 입력하기
      </h3>
      <form
        onSubmit={handleSubmit(handleSubmitHandler)}
        className={classNames(styles.form)}>
        <div>
          <div className={classNames(styles.dividerWrapper)}>
            <span>계정 정보</span>
            <hr className={classNames(styles.divider)} />
          </div>
          <div className={classNames(styles.inputContainer)}>
            <Input
              label='아이디'
              errorMessage={errors.id?.message && String(errors.id?.message)}
              {...registers.id}
            />
            <Input
              label='비밀번호'
              placeholder='비밀번호(영문 + 숫자 + 특수문자 8자 이상)'
              type='password'
              errorMessage={
                errors.password?.message && String(errors.password?.message)
              }
              {...registers.password}
            />
            <Input
              placeholder='비밀번호 확인'
              type='password'
              errorMessage={
                errors.passwordCheck?.message &&
                String(errors.passwordCheck?.message)
              }
              {...registers.passwordCheck}
            />
          </div>
        </div>
        <div>
          <div className={classNames(styles.dividerWrapper)}>
            <span>회원 정보</span>
            <hr className={classNames(styles.divider)} />
          </div>
          <div className={classNames(styles.inputContainer)}>
            <Input
              label='이름'
              {...registers.name}
            />
            <Input
              label='생년월일'
              {...registers.birth}
            />
            <Input
              label='이메일'
              onChangeEmailDomain={(e) => handleChangeEmailDomain(e)}
              setEmailDomain={setEmailDomain}
              isEmail
              {...registers.email}
            />
          </div>
        </div>
        <button
          // onClick={() => navigate('/sign-up/complete')}
          className={classNames(styles.submitButton)}
          type='submit'>
          완료
        </button>
      </form>
    </div>
  );
};
