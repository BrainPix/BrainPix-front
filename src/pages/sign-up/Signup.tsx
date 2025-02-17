import { useContext, useState } from 'react';
import classNames from 'classnames';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import styles from './signup.module.scss';
import { useMutation } from '@tanstack/react-query';

import Logo from '../../assets/icons/logo.svg?react';
import { SignupRegisters } from '../../constants/registers';
import { StepOne } from '../../components/sign-up/StepOne';
import { StepTwo } from '../../components/sign-up/StepTwo';
import { postCompanySignUp, postPersonalSignUp } from '../../apis/authAPI';
import {
  CompanySignUpPayload,
  PersonalSignUpPayload,
} from '../../types/authType';
import { ToastContext } from '../../contexts/toastContext';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<'personal' | 'corporate'>(
    'personal',
  );
  const { errorToast, successToast } = useContext(ToastContext);

  const { mutate: signupPersonalMutation } = useMutation({
    mutationFn: (formData: PersonalSignUpPayload) =>
      postPersonalSignUp(formData),
    onError: () => errorToast('회원가입에 실패하였습니다.'),
    onSuccess: () => {
      successToast('회원가입에 성공하였습니다.');
      navigate('/login/personal');
    },
  });

  const { mutate: signupCompanyMutation } = useMutation({
    mutationFn: (formData: CompanySignUpPayload) => postCompanySignUp(formData),
    onError: () => errorToast('회원가입에 실패하였습니다.'),
    onSuccess: () => {
      successToast('회원가입에 성공하였습니다.');
      navigate('/login/corporate');
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
    getFieldState,
    trigger,
    setError,
  } = useForm({ mode: 'onTouched' });

  const registers = SignupRegisters({
    register,
    watch,
    setValue,
    setError,
  });

  const handleSubmitHandler: SubmitHandler<FieldValues> = async (payload) => {
    if (userType === 'personal') {
      const { id, email, password, name, nickname, birth } = payload;
      const requestBody = {
        id,
        email,
        password,
        name,
        nickName: nickname,
        birthday: birth,
        emailToken: localStorage.getItem('signupToken'),
      };
      return signupPersonalMutation(requestBody);
    }

    if (userType === 'corporate') {
      const { id, email, password, name, nickname, birth, position } = payload;
      const requestBody = {
        id,
        email,
        password,
        name,
        companyName: nickname,
        position: position,
        birthday: birth,
        emailToken: localStorage.getItem('signupToken'),
      };
      return signupCompanyMutation(requestBody);
    }
  };

  const handleClickNextButton = async () => {
    await trigger();

    if (
      !(
        getFieldState('id').invalid ||
        getFieldState('password').invalid ||
        getFieldState('passwordCheck').invalid
      )
    ) {
      setStep(2);
    }
  };

  const handleClickUserTypeButton = (userType: 'personal' | 'corporate') => {
    setUserType(userType);
  };

  const REGISTERS = {
    id: registers.id,
    password: registers.password,
    passwordCheck: registers.passwordCheck,
    name: registers.name,
    birth: registers.birth,
    nickname: registers.nickname,
    email: registers.email,
    position: registers.position,
  };

  return (
    <div
      className={classNames(styles.container)}
      onSubmit={handleSubmit(handleSubmitHandler)}>
      <form className={classNames(styles.contentContainer)}>
        <Logo className={classNames(styles.logo)} />
        {step === 1 && (
          <StepOne
            onClickUserTypeButton={handleClickUserTypeButton}
            onClickNext={handleClickNextButton}
            userType={userType}
            registers={REGISTERS}
            errors={errors}
          />
        )}
        {step === 2 && (
          <StepTwo
            registers={REGISTERS}
            errors={errors}
            isValid={isValid}
            userType={userType}
            fieldState={getFieldState}
            watch={watch}
          />
        )}
      </form>
    </div>
  );
};
