import classNames from 'classnames';
import styles from './myProfileCard.module.scss';
import Label from '../../common/label/Label';

const USER_DATA = {
  name: 'SEO YEON',
  profileImage: null,
  type: '개인',
};

export const MyProfileCard = () => {
  return (
    <div className={classNames(styles.container)}>
      {USER_DATA.profileImage ? (
        <img
          className={classNames(styles.profile)}
          src={USER_DATA.profileImage}
          alt='프로필 이미지'
        />
      ) : (
        <div className={classNames(styles.profile)} />
      )}
      <div>
        <Label
          type='personal'
          text='개인'
        />
        <h1 className={classNames(styles.name)}>{USER_DATA.name}</h1>
      </div>
    </div>
  );
};
