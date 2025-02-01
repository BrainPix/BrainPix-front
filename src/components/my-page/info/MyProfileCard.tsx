import classNames from 'classnames';
import styles from './myProfileCard.module.scss';
import Label from '../../common/label/Label';

interface MyProfileCardPropsType {
  status: 'main' | 'edit' | 'save';
  onClickButton?: () => void;
}

const USER_DATA = {
  name: 'SEO YEON',
  profileImage: null,
  type: '개인',
  position: 'IT/디자인',
};

export const MyProfileCard = ({
  status,
  onClickButton,
}: MyProfileCardPropsType) => {
  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(styles.profileContainer)}>
        {USER_DATA.profileImage ? (
          <img
            className={classNames(styles.profile)}
            src={USER_DATA.profileImage}
            alt='프로필 이미지'
          />
        ) : (
          <div className={classNames(styles.profile)} />
        )}
        <div className={classNames(styles.info)}>
          <Label
            text='개인'
            type='personal'
          />
          <h1 className={classNames(styles.name)}>{USER_DATA.name}</h1>
          {(status === 'edit' || status === 'save') && (
            <span className={classNames(styles.position)}>
              {USER_DATA.position}
            </span>
          )}
        </div>
        {status === 'edit' && (
          <button
            type='button'
            onClick={onClickButton}
            className={classNames(styles.editButton, 'buttonOutlined-grey500')}>
            수정하기
          </button>
        )}
        {status === 'save' && (
          <button
            type='submit'
            className={classNames(styles.editButton, 'buttonOutlined-grey500')}>
            저장하기
          </button>
        )}
      </div>
      {status == 'save' && (
        <button
          className={classNames(styles.profileEditButton)}
          type='button'>
          프로필 사진 수정
        </button>
      )}
    </div>
  );
};
