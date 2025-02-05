import classNames from 'classnames';
import styles from './sidebar.module.scss';

export const Sidebar = () => {
  const location = window.location.pathname;

  const MENU_LOCATION = {
    포트폴리오: '/my/portfolio',
    '게시물 관리': '/my/posts',
    지원현황: '/my/apply',
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
      </div>
    </div>
  );
};
