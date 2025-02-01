import classNames from 'classnames';
import styles from './stepOne.module.scss';

import { Input } from './Input';

interface StepOnePropsType {
  onClickNext: () => void;
  userType: 'individual' | 'corporate';
  onClickUserTypeButton: (userType: 'individual' | 'corporate') => void;
}

export const StepOne = ({
  onClickNext,
  userType,
  onClickUserTypeButton,
}: StepOnePropsType) => {
  return (
    <div>
      <div className={classNames(styles.headlineWrapper)}>
        <h2 className={classNames(styles.main)}>가입 정보 입력하기</h2>
        <h3 className={classNames(styles.sub)}>
          브레인픽스에 오신 걸 환영해요
        </h3>
      </div>
      <div className={classNames(styles.userTypeWrapper)}>
        <div
          onClick={() => onClickUserTypeButton('individual')}
          className={classNames(styles.userType, {
            [styles.clicked]: userType === 'individual',
          })}>
          개인 회원
        </div>
        <div
          onClick={() => onClickUserTypeButton('corporate')}
          className={classNames(styles.userType, {
            [styles.clicked]: userType === 'corporate',
          })}>
          기업 회원
        </div>
      </div>
      <form className={classNames(styles.form)}>
        <div>
          <div className={classNames(styles.inputContainer)}>
            <Input
              label='아이디'
              placeholder='6-12자의 소문자 영문, 숫자만 사용 가능'
              // errorMessage={errors.id?.message && String(errors.id?.message)}
              // {...registers.id}
            />
            <Input
              label='비밀번호'
              placeholder='반드시 영문, 숫자, 특수문자 중 2가지 이상 사용해 8자 이상'
              type='password'
              // errorMessage={
              //   errors.password?.message && String(errors.password?.message)
              // }
              // {...registers.password}
            />
            <Input
              label='비밀번호 확인'
              placeholder='비밀번호 확인'
              type='password'
              // errorMessage={
              //   errors.passwordCheck?.message &&
              //   String(errors.passwordCheck?.message)
              // }
              // {...registers.passwordCheck}
            />
          </div>
        </div>
      </form>
      <div className={classNames(styles.buttonWrapper)}>
        <button
          // onClick={() => navigate('/sign-up/complete')}
          className={classNames(styles.left, 'buttonOutlined-grey500')}
          type='button'>
          이전
        </button>
        <button
          onClick={onClickNext}
          className={classNames(styles.right, 'buttonFilled-grey800')}
          type='submit'>
          다음
        </button>
      </div>
    </div>
  );
};
