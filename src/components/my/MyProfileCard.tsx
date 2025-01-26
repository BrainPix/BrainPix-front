import classNames from 'classnames';
import styles from './myProfileCard.module.scss';

interface MyProfileCardPropsType {
  status: 'main' | 'edit' | 'save';
}

const USER_DATA = {
  name: 'SEO YEON',
  profileImage: null,
  type: '개인',
  position: 'IT/디자인',
};

export const MyProfileCard = ({ status }: MyProfileCardPropsType) => {
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
        <div className={classNames(styles.typeWrapper)}>
          <div>{USER_DATA.type}</div>
          {status === 'edit' && (
            <span className={classNames(styles.position)}>
              {USER_DATA.position}
            </span>
          )}
        </div>
        <h1 className={classNames(styles.name)}>{USER_DATA.name}</h1>
      </div>
      {status === 'edit' && (
        <button
          className={classNames(styles.editButton, 'buttonOutlined-grey500')}>
          수정하기
        </button>
      )}
    </div>
  );
};
