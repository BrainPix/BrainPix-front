import classNames from 'classnames';
import styles from './sidebar.module.scss';

export const Sidebar = () => {
  const location = window.location.pathname;

  const MENU_LOCATION = {
    포트폴리오: '/my/portfolio',
    '게시물 관리': '/my/posts',
    지원현황: '/my/support',
    메신저: '/my/message',
    저장: '/my/save',
  };

  return (
    <div className={classNames(styles.container)}>
      <a
        href='/my'
        className={classNames(styles.mainTitle, {
          [styles.clicked]: location === '/my',
        })}>
        마이페이지
      </a>
      <a
        href='/my/info'
<<<<<<< HEAD
        className={classNames(styles.subTitle, {
          [styles.clicked]: location === '/my/info',
        })}>
        내 정보
      </a>
      <div className={classNames(styles.menuWrapper)}>
        {Object.entries(MENU_LOCATION).map(([name, menuLoaction]) => (
          <a
            href={menuLoaction}
            key={name}
            className={classNames({
              [styles.clicked]: location === menuLoaction,
            })}>
            {name}
          </a>
        ))}
=======
        className={classNames(styles.subTitle)}>
        내 정보
      </a>
      <div className={classNames(styles.menuWrapper)}>
        <a href='/my/portfolio'>포트폴리오</a>
        <a href='/my/posts'>게시물 관리</a>
        <a href='my'>지원현황</a>
        <a href='my'>메신저</a>
        <a href='my'>저장</a>
>>>>>>> e3d04e9a095e417267faa97ca8a75f401b39f1f2
      </div>
    </div>
  );
};
