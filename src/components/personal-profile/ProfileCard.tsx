import classNames from 'classnames';
import Mail from '../../assets/icons/mail.svg?react';
import styles from './profileCard.module.scss';
import Label from '../common/label/Label';
import { CATEGORY_LABELS } from '../../constants/categoryMapper';

interface ProfileCardPropsType {
  userType: string;
  userName: string;
  specializations: string[];
  profileImage: string;
}

export const ProfileCard = ({
  userType,
  userName,
  specializations,
  profileImage,
}: ProfileCardPropsType) => {
  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(styles.profileContainer)}>
        <div className={classNames(styles.profileImage)} />
        <div className={classNames(styles.profileNameContainer)}>
          <Label
            text='기업'
            type='personal'
          />
          <h1 className={classNames(styles.userName)}>{userName}</h1>
          <div className={classNames(styles.role)}>
            {specializations.map((role) => (
              <span key={role}>{CATEGORY_LABELS[role]}</span>
            ))}
          </div>
        </div>
      </div>
      <div className={classNames(styles.mailIcon)}>
        <Mail />
      </div>
    </div>
  );
};
