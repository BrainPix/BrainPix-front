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
        <img
          className={classNames(styles.profileImage)}
          alt='프로필 이미지'
          src={profileImage}
        />
        <div className={classNames(styles.profileNameContainer)}>
          <Label
            text={userType === 'personal' ? '개인' : '기업'}
            type={userType as 'personal' | 'corporate'}
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
