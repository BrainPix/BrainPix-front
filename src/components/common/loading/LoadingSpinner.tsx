import { PulseLoader } from 'react-spinners';
import styles from './loadingSpinner.module.scss';

const LoadingSpinner = () => {
  return (
    <div className={styles.spinner}>
      <PulseLoader />
    </div>
  );
};

export default LoadingSpinner;
