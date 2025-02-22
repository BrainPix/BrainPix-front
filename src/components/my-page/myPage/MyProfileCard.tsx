import classNames from 'classnames';
import styles from './myProfileCard.module.scss';

import Label from '../../common/label/Label';
import { formatToLabelText } from '../../../utils/formatToLabelText';
import { MyBaseInfoType } from '../../../types/myPageType';
import { Image } from '../../common/image/Image';

interface MyProfileCardPropsType {
  userData: MyBaseInfoType;
}

export const MyProfileCard = ({ userData }: MyProfileCardPropsType) => {
  type LabelType = 'corporate' | 'corporatePublic' | 'personal' | 'selfOffer';
  const userType = localStorage.getItem('myType');

  const { nickname } = userData;

  return (
    <div className={classNames(styles.container)}>
      {userData.profileImage ? (
        <Image
          className={classNames(styles.profile)}
          src={userData.profileImage}
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
        <h1 className={classNames(styles.name)}>{nickname}</h1>
      </div>
    </div>
  );
};
