import classNames from 'classnames';
import styles from './myProfileCard.module.scss';
import Label from '../../common/label/Label';
import { formatToLabelText } from '../../../utils/formatToLabelText';

const USER_DATA = {
  name: 'SEO YEON',
  profileImage: null,
  type: '개인',
};

interface MyProfileCardPropsType {
  name: string;
}

export const MyProfileCard = ({ name }: MyProfileCardPropsType) => {
  type LabelType = 'corporate' | 'corporatePublic' | 'personal' | 'selfOffer';
  const userType = localStorage.getItem('myType');

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
          type={(userType as LabelType) || 'corporate'}
          text={(userType && formatToLabelText(userType as LabelType)) ?? ''}
        />
        <h1 className={classNames(styles.name)}>{name}</h1>
      </div>
    </div>
  );
};
