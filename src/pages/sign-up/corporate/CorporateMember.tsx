import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import classNames from 'classnames';
import { Input } from '../../../components/sign-up/Input';
import styles from './corporateMember.module.scss';
// import { useNavigate } from 'react-router-dom';

export const CorporateMember = () => {
  // const navigate = useNavigate();

  const { register, handleSubmit } = useForm({ mode: 'onTouched' });

  const registers = {
    id: register('id'),
    password: register('password'),
    passwordCheck: register('passwordCheck'),
    name: register('name'),
    companyName: register('companyName'),
    birth: register('birth'),
    email: register('email'),
    position: register('position'),
  };

  const handleSubmitHandler: SubmitHandler<FieldValues> = (payload) => {
    console.log(payload);
  };

  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(styles.logo)}>로고</div>
      <h3 className={classNames(styles.title, styles.textBlue)}>
        <strong>기업 회원 </strong>
        가입 정보 입력하기
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
              {...registers.password}
            />
            <Input
              placeholder='비밀번호 확인'
              {...registers.passwordCheck}
            />
          </div>
        </div>
        <div>
          <div className={classNames(styles.dividerWrapper)}>
            <span>기업 회원 정보</span>
            <hr className={classNames(styles.divider)} />
          </div>
          <div className={classNames(styles.inputContainer)}>
            <Input
              label='담당자 이름'
              {...registers.name}
            />
            <Input
              label='생년월일'
              {...registers.birth}
            />
            <Input
              label='기업 명'
              {...registers.companyName}
            />
            <Input
              label='직책'
              {...registers.position}
            />
            <Input
              label='기업 이메일'
              type='email'
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
