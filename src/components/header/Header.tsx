import classNames from 'classnames';
import Search from '../../assets/icons/search.svg?react';
import styles from './header.module.scss';

export const Header = () => {
  const location = window.location.pathname;

  const OPTION_MENU = {
    등록하기: '/register',
    요청하기: '/request',
    마이: 'my',
  };
  const PAGE_MENU = {
    '아이디어 마켓': '/idea-market',
    '요청 과제': '/request-assign',
    '협업 광장': '/collaboration',
  };
  return (
    <div>
      <div className={classNames(styles.container)}>
        <label className={classNames(styles.input)}>
          <Search />
          <input
            className={classNames(styles.inputText)}
            placeholder='어떤 아이디어를 찾으시나요? 키워드를 입력하세요'
          />
        </label>
        <menu>
          <div className={classNames(styles.optionWrapper)}>
            {Object.entries(OPTION_MENU).map(([menu, link]) => (
              <a
                href={link}
                key={menu}>
                {menu}
              </a>
            ))}
          </div>
        </menu>
      </div>
      <div className={classNames(styles.bottomPageWrapper)}>
        {Object.entries(PAGE_MENU).map(([page, link]) => (
          <a
            href={link}
            className={classNames({ [styles.clickedPage]: link === location })}
            key={page}>
            {page}
          </a>
        ))}
      </div>
    </div>
  );
};
