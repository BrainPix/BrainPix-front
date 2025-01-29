import classNames from 'classnames';
import styles from './myProfileCard.module.scss';

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
        <div>{USER_DATA.type}</div>
        <h1 className={classNames(styles.name)}>{USER_DATA.name}</h1>
      </div>
    </div>
  );
};
