import classNames from 'classnames';
import Mail from '../../assets/icons/mail.svg?react';
import styles from './profileCard.module.scss';

export const ProfileCard = () => {
  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(styles.profileContainer)}>
        <div className={classNames(styles.profileImage)} />
        <div className={classNames(styles.profileNameContainer)}>
          <div className={classNames(styles.userType)}>역할 태그 놓을 곳</div>
          <h1 className={classNames(styles.userName)}>이름</h1>
          <h3 className={classNames(styles.role)}>기획/운영</h3>
        </div>
      </div>
      <div className={classNames(styles.mailIcon)}>
        <Mail />
      </div>
    </div>
  );
};
