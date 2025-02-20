import { PulseLoader } from 'react-spinners';
import styles from './loadingSpinner.module.scss';

const LoadingSpinner = () => {
  return (
    <div className={styles.spinner}>
      <PulseLoader color='#377FF8' />
    </div>
  );
};

export default LoadingSpinner;
