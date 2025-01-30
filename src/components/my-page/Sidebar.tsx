import classNames from 'classnames';
import styles from './sidebar.module.scss';

export const Sidebar = () => {
  return (
    <div className={classNames(styles.container)}>
      <a
        href='/my'
        className={classNames(styles.mainTitle)}>
        마이페이지
      </a>
      <a
        href='/my'
        className={classNames(styles.subTitle)}>
        내 정보
      </a>
      <div className={classNames(styles.menuWrapper)}>
        <a href='/my/portfolio'>포트폴리오</a>
        <a href='my'>게시물 관리</a>
        <a href='my'>지원현황</a>
        <a href='my'>메신저</a>
        <a href='my'>저장</a>
      </div>
    </div>
  );
};
