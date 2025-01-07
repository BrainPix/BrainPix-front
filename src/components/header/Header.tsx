import classNames from 'classnames';
import styles from './header.module.scss';

export const Header = () => {
  const MENU = {
    등록하기: '/register',
    요청하기: '/request',
    마이: 'my',
  };
  return (
    <div className={classNames(styles.container)}>
      <input
        className={classNames(styles.input)}
        placeholder='어떤 아이디어를 찾으시나요? 키워드를 입력하세요'
      />
      <menu>
        {Object.entries(MENU).map(([menu, link]) => (
          <a href={link}>{menu}</a>
        ))}
      </menu>
    </div>
  );
};
