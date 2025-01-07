import classNames from 'classnames';
import Search from '../../assets/icons/search.svg?react';

import styles from './header.module.scss';

export const Header = () => {
  const OPTION_MENU = {
    등록하기: '/register',
    요청하기: '/request',
    마이: 'my',
  };
  return (
    <div className={classNames(styles.container)}>
      <label className={classNames(styles.input)}>
        <Search />
        <input
          className={classNames(styles.inputText)}
          placeholder='어떤 아이디어를 찾으시나요? 키워드를 입력하세요'
        />
      </label>
      <menu>
        {Object.entries(OPTION_MENU).map(([menu, link]) => (
          <a
            href={link}
            key={menu}>
            {menu}
          </a>
        ))}
      </menu>
    </div>
  );
};
