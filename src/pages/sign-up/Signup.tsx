import { useState } from 'react';
import classNames from 'classnames';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import styles from './signup.module.scss';

import { IndividualMemberRegisters } from '../../constants/registers';
import { StepOne } from '../../components/sign-up/StepOne';
import { StepTwo } from '../../components/sign-up/StepTwo';
import { postPersonalSignUp } from '../../apis/auth';
import { useMutation } from '@tanstack/react-query';
import { PersonalSignUpPayload } from '../../types/auth';

export const Signup = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<'individual' | 'corporate'>(
    'individual',
  );

  const { mutate: signupMutation } = useMutation({
    mutationFn: (formData: PersonalSignUpPayload) =>
      postPersonalSignUp(formData),
    onSuccess: (response) => {
      console.log(response);
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
  } = useForm({ mode: 'onTouched' });

  const registers = IndividualMemberRegisters({
    register,
    watch,
    setValue,
  });

  const handleSubmitHandler: SubmitHandler<FieldValues> = async (payload) => {
    const { id, email, password, name, nickname, birth } = payload;
    const requestBody = {
      id,
      email,
      password,
      name,
      nickName: nickname,
      birthday: birth,
    };
    signupMutation(requestBody);
    // location.href = '/idea-market';
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
          />
        )}
      </form>
    </div>
  );
};
