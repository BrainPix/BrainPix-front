import { Outlet } from 'react-router-dom';
import { Sidebar } from '../../components/my/Sidebar';
import classNames from 'classnames';
import styles from './myPageLayout.module.scss';

export const MyPageLayout = () => {
  return (
    <div className={classNames(styles.container)}>
      <Sidebar />
      <div className={classNames(styles.content)}>
        <Outlet />
      </div>
    </div>
  );
};
