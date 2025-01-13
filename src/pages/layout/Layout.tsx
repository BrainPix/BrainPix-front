import { Outlet } from 'react-router-dom';
import { Header } from '../../components/common/header/Header';

export const Layout = () => {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
};
