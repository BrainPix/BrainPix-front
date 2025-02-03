import classNames from 'classnames';
import styles from './stepTwo.module.scss';
import {
  FieldErrors,
  FieldValues,
  UseFormRegisterReturn,
} from 'react-hook-form';

import { Input } from './Input';

interface StepTwoPropType {
  registers: Record<string, UseFormRegisterReturn>;
  errors: FieldErrors<FieldValues>;
}

export const StepTwo = ({ registers, errors }: StepTwoPropType) => {
  return (
    <div>
      <div className={classNames(styles.headlineWrapper)}>
        <h2 className={classNames(styles.main)}>회원 정보 입력하기</h2>
        <h3 className={classNames(styles.sub)}>이제 마지막 단계예요!</h3>
      </div>
      <div className={classNames(styles.form)}>
        <div>
          <div className={classNames(styles.inputContainer)}>
            <div className={classNames(styles.rowContainer)}>
              <Input
                label='이름'
                placeholder='이름 입력'
                type='text'
                errorMessage={errors.id?.message && String(errors.id?.message)}
                {...registers.name}
              />
              <Input
                label='생년월일'
                placeholder='2025/01/01'
                type='text'
                errorMessage={
                  errors.password?.message && String(errors.password?.message)
                }
                {...registers.birth}
              />
            </div>
            <Input
              label='닉네임 입력'
              placeholder='닉네임 입력'
              type='text'
              errorMessage={
                errors.passwordCheck?.message &&
                String(errors.passwordCheck?.message)
              }
              {...registers.nickname}
            />
            <div className={classNames(styles.rowContainer)}>
              <div className={classNames(styles.emailInputContainer)}>
                <Input
                  label='이메일 인증'
                  placeholder='이메일 입력'
                  type='email'
                  errorMessage={
                    errors.passwordCheck?.message &&
                    String(errors.passwordCheck?.message)
                  }
                  {...registers.email}
                />
              </div>
              <button
                type='button'
                className={classNames(
                  styles.emailButton,
                  'buttonFilled-grey400',
                )}>
                인증
              </button>
            </div>
          </div>
        </div>
        <button
          className={classNames(styles.submitButton, 'buttonFilled-grey800')}
          type='submit'>
          완료
        </button>
      </div>
    </div>
  );
};
