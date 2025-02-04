import { useState } from 'react';
import classNames from 'classnames';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import styles from './signup.module.scss';
import { useMutation } from '@tanstack/react-query';

import { SignupRegisters } from '../../constants/registers';
import { StepOne } from '../../components/sign-up/StepOne';
import { StepTwo } from '../../components/sign-up/StepTwo';
import { postCompanySignUp, postPersonalSignUp } from '../../apis/authAPI';
import {
  CompanySignUpPayload,
  PersonalSignUpPayload,
} from '../../types/authType';

export const Signup = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<'individual' | 'corporate'>(
    'individual',
  );

  const { mutate: signupPersonalMutation } = useMutation({
    mutationFn: (formData: PersonalSignUpPayload) =>
      postPersonalSignUp(formData),
  });

  const { mutate: signupCompanyMutation } = useMutation({
    mutationFn: (formData: CompanySignUpPayload) => postCompanySignUp(formData),
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
    if (userType === 'individual') {
      const { id, email, password, name, nickname, birth } = payload;
      const requestBody = {
        id,
        email,
        password,
        name,
        nickName: nickname,
        birthday: birth,
      };
      return signupPersonalMutation(requestBody);
      // location.href = '/idea-market';
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

  const handleClickUserTypeButton = (userType: 'individual' | 'corporate') => {
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
        <div className={classNames(styles.logo)}>로고</div>
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
          />
        )}
      </form>
    </div>
  );
};
