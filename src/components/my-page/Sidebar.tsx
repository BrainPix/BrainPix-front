import { useState } from 'react';
import classNames from 'classnames';
import styles from './sidebar.module.scss';

export const Sidebar = () => {
  const location = window.location.pathname;
  const [activeSubMenu, setActiveSubMenu] = useState(location);

  const MENU_LOCATION = {
    포트폴리오: '/my/portfolio',
    '게시물 관리': '/my/posts',
    '지원 현황': '/my/apply',
    메신저: '/my/message',
    저장: '/my/save',
  };

  const SUB_MENU_LOCATION = [
    { name: '아이디어 마켓', link: '/my/apply-idea-market' },
    { name: '요청 과제', link: '/my/apply-request' },
    { name: '협업 광장', link: '/my/apply-collaboration'},
  ];

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
      <div className={styles.menuWrapper}>
        {Object.entries(MENU_LOCATION).map(([name, menuLocation]) => (
          <div key={name} className={styles.menuItem}>
            <a href={menuLocation} className={classNames({ [styles.clicked]: location === menuLocation })}>
              {name}
            </a>

            {/* 지원 현황의 서브 메뉴 */}
            {name === '지원 현황' && (
              <div className={styles.subMenu}>
                {SUB_MENU_LOCATION.map((subItem) => (
                  <a key={subItem.name} href={subItem.link} className={classNames(styles.subMenuItem, {
                    [styles.active]: activeSubMenu === subItem.link,
                  })}
                  onClick={() => setActiveSubMenu(subItem.link)}
                  >
                    {subItem.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
