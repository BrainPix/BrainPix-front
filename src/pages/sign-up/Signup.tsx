import { useState } from 'react';
import classNames from 'classnames';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import styles from './signup.module.scss';

import { IndividualMemberRegisters } from '../../constants/registers';
import { StepOne } from '../../components/sign-up/StepOne';
import { StepTwo } from '../../components/sign-up/StepTwo';
import { postSignUp } from '../../apis/auth';

export const Signup = () => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<'individual' | 'corporate'>(
    'individual',
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  const registers = IndividualMemberRegisters({
    register,
    watch,
    setValue,
    getValues,
  });

  const handleSubmitHandler: SubmitHandler<FieldValues> = async (payload) => {
    const { id, email, password, name, nickname, birth } = payload;
    const requestBody = {
      id,
      email,
      password,
      name,
      nickname,
      birthday: birth,
    };
    console.log(payload);
    try {
      postSignUp(requestBody);
    } catch (error) {
      console.error(error);
    }
  };

  const handleClickNextButton = () => {
    setStep(2);
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
          />
        )}
      </form>
    </div>
  );
};
