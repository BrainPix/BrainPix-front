import { useParams } from 'react-router-dom';
import { ProfileCard } from '../../components/personal-profile/ProfileCard';
import classNames from 'classnames';
import styles from './personalProfile.module.scss';

export const PersonalProfile = () => {
  const { id } = useParams();
  console.log(id);
  return (
    <div className={classNames(styles.container)}>
      <ProfileCard />
    </div>
  );
};
