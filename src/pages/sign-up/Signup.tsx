import { useState } from 'react';
import classNames from 'classnames';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import styles from './signup.module.scss';

import { IndividualMemberRegisters } from '../../constants/registers';
import { StepOne } from '../../components/sign-up/StepOne';
import { StepTwo } from '../../components/sign-up/StepTwo';

export const Signup = () => {
  const [emailDomain, setEmailDomain] = useState('');
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState<'individual' | 'corporate'>(
    'individual',
  );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({ mode: 'onTouched' });

  const registers = IndividualMemberRegisters({ register, watch, setValue });

  const handleSubmitHandler: SubmitHandler<FieldValues> = (payload) => {
    const data = { ...payload, email: payload.email + '@' + emailDomain };
    console.log(data);
  };

  const handleClickNextButton = () => {
    setStep(2);
  };

  const handleClickUserTypeButton = (userType: 'individual' | 'corporate') => {
    setUserType(userType);
  };

  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(styles.contentContainer)}>
        <div className={classNames(styles.logo)}>로고</div>
        {step === 1 && (
          <StepOne
            onClickUserTypeButton={handleClickUserTypeButton}
            onClickNext={handleClickNextButton}
            userType={userType}
          />
        )}
        {step === 2 && <StepTwo />}
        {/* <div>
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
                placeholder='YYYY-MM-DD'
                maxLength={10}
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
          </div> */}
      </div>
    </div>
  );
};
