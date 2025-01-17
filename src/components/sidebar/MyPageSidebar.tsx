import styles from './myPageSidebar.module.scss';
import classNames from 'classnames';

const MyPageSidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.sidebarTitle}>마이페이지</h2>
      <nav className={styles.nav}>
        <div className={styles.navItem}>포트폴리오</div>
        <div className={classNames(styles.navItem, styles.active)}>
          게시물 관리
        </div>
        <div className={styles.navItem}>BrainPIX 지원 현황</div>
        <div className={styles.navItem}>메신저</div>
        <div className={styles.navItem}>저장</div>
      </nav>
    </aside>
  );
};

export default MyPageSidebar;
