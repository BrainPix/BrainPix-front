import { useState } from 'react';
import classNames from 'classnames';
import styles from './header.module.scss';

import { SearchInput } from './SearchInput';
import Alarm from '../../../assets/icons/alarm.svg?react';

const OPTION_MENU = {
  등록하기: '/register',
  요청하기: '/request',
  마이: '/my',
};
const PAGE_MENU = {
  '아이디어 마켓': '/idea-market',
  '요청 과제': '/request-assign',
  '협업 광장': '/collaboration',
};

export const Header = () => {
  const location = window.location.pathname;

  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div>
      <div className={classNames(styles.container)}>
        <SearchInput />
        <menu>
          <div className={classNames(styles.optionContainer)}>
            <div className={classNames(styles.optionWrapper)}>
              {Object.entries(OPTION_MENU).map(([menu, link]) => (
                <a
                  href={link}
                  key={menu}>
                  {menu}
                </a>
              ))}
            </div>
            <div className={classNames(styles.alarmWrapper)}>
              <Alarm />
            </div>
          </div>
        </menu>
      </div>
      <div className={classNames(styles.bottomPageWrapper)}>
        {Object.entries(PAGE_MENU).map(([page, link]) => (
          <a
            onMouseEnter={() => setOpenMenu(page === '아이디어 마켓')}
            onMouseLeave={() => setOpenMenu(false)}
            href={link}
            className={classNames({ [styles.clickedPage]: link === location })}
            key={page}>
            {page}
          </a>
        ))}
        {openMenu && (
          <div
            className={classNames(styles.hoverMenu)}
            onMouseEnter={() => setOpenMenu(true)}
            onMouseLeave={() => setOpenMenu(false)}>
            <a href='/idea-market/idea-solution'>Idea Solution</a>
            <a href='/idea-market/market-place'>Market Place</a>
          </div>
        )}
      </div>
    </div>
  );
};
