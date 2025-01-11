import classNames from 'classnames';
import { Input } from './Input';
import styles from './corporateMember.module.scss';

export const CorporateMember = () => {
  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(styles.logo)}>로고</div>
      <h3 className={classNames(styles.title, styles.textBlue)}>
        <strong>기업 회원 </strong>
        가입 정보 입력하기
      </h3>
      <form className={classNames(styles.form)}>
        <div>
          <div className={classNames(styles.dividerWrapper)}>
            <span>계정 정보</span>
            <hr className={classNames(styles.divider)} />
          </div>
          <div className={classNames(styles.inputContainer)}>
            <Input label='아이디' />
            <Input
              label='비밀번호'
              placeholder='비밀번호(영문 + 숫자 + 특수문자 8자 이상)'
            />
            <Input placeholder='비밀번호 확인' />
          </div>
        </div>
        <div>
          <div className={classNames(styles.dividerWrapper)}>
            <span>기업 회원 정보</span>
            <hr className={classNames(styles.divider)} />
          </div>
          <div className={classNames(styles.inputContainer)}>
            <Input label='담당자 이름' />
            <Input label='생년월일' />
            <Input label='기업 명' />
            <Input label='직책' />
            <Input
              label='기업 이메일'
              type='email'
            />
          </div>
        </div>
        <button
          className={classNames(styles.submitButton)}
          type='submit'>
          완료
        </button>
      </form>
    </div>
  );
};
