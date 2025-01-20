import React from 'react';
import { Header } from '../../components/header/Header.tsx';
import MyPageSidebar from '../../components/sidebar/MyPageSidebar.tsx';
import styles from './myPageLayout.module.scss';

interface MyPageLayoutProps {
  children: React.ReactNode;
}

const MyPageLayout: React.FC<MyPageLayoutProps> = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.contentWrapper}>
        <MyPageSidebar />
        <main className={styles.mainContent}>{children}</main>
      </div>
    </div>
  );
};

export default MyPageLayout;
