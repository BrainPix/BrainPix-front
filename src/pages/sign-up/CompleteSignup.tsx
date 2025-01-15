import classNames from 'classnames';
import styles from './completeSignup.module.scss';

export const CompleteSignup = () => {
  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(styles.welcomeContainer)}>
        <div className={classNames(styles.logoCharacter)}>
          BrainPIX <br />
          로고 캐릭터
        </div>
        <div>
          안녕하세요. <strong>OO님!</strong>
          <div className={classNames(styles['flexRow'])}>
            <div className={classNames(styles.logo)}>BrainPIX 로고</div>의
            회원이 되신 것을
          </div>
          환영합니다!
        </div>
      </div>
      <div className={classNames(styles.movePageContainer)}>
        <h3>지금 바로 시작하기!</h3>
        <div className={classNames(styles.pageWrapper)}>
          <a
            className={classNames(styles.pageButton, styles.ideaMarket)}
            href='/idea-market'>
            <h3 className={classNames(styles.title)}>아이디어 마켓</h3>
            <p className={classNames(styles.content)}>
              자신의 아이디어를 <br />
              공개하고 판매할 수 있어요.
            </p>
          </a>
          <a
            className={classNames(styles.pageButton, styles.ideaRequest)}
            href='/request-assign'>
            <h3 className={classNames(styles.title)}>아이디어 요청</h3>
            <p className={classNames(styles.content)}>
              원하는 프로젝트에 대한 <br />
              아이디어를 요청할 수 있어요.
            </p>
          </a>
        </div>
      </div>
      <button className={classNames(styles.mainHomeButton)}>메인 홈</button>
    </div>
  );
};
