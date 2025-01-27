import classNames from 'classnames';
import styles from './sidebar.module.scss';

export const Sidebar = () => {
  return (
    <div className={classNames(styles.container)}>
      <h1>마이페이지</h1>
      <h2>내 정보</h2>
      <div className={classNames(styles.menuWrapper)}>
        <a href='my'>포트폴리오</a>
        <a href='/my/posts'>게시물 관리</a>
        <a href='my'>지원현황</a>
        <a href='my'>메신저</a>
        <a href='my'>저장</a>
      </div>
    </div>
  );
};
