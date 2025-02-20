import styles from './loadingPage.module.scss';
import LoadingSpinner from '../../components/error/LoadingSpinner';
import Logo from '../../assets/icons/logo.svg?react';

const LoadingPage = () => {
  return (
    <div className={styles.container}>
      <Logo className={styles.logo} />
      <p className={styles.title}>잠시만 기다려주세요</p>
      <p className={styles.subtitle}>브레인픽스를 로딩 중이에요.</p>
      <LoadingSpinner />
    </div>
  );
};

export default LoadingPage;
