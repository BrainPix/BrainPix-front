import { ChangeEvent, useState } from 'react';
import classNames from 'classnames';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
// import { useNavigate } from 'react-router-dom';
import { Input } from '../../../components/sign-up/Input';
import styles from './individualMember.module.scss';

export const IndividualMember = () => {
  // const navigate = useNavigate();
  const [emailDomain, setEmailDomain] = useState('');

  const { register, handleSubmit } = useForm();

  const registers = {
    id: register('id'),
    password: register('password'),
    passwordCheck: register('passwordCheck'),
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
              {...registers.id}
            />
            <Input
              label='비밀번호'
              placeholder='비밀번호(영문 + 숫자 + 특수문자 8자 이상)'
              type='password'
              {...registers.password}
            />
            <Input
              placeholder='비밀번호 확인'
              type='password'
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
