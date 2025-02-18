import classNames from 'classnames';
import styles from './myProfileCard.module.scss';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

import Label from '../../common/label/Label';
import {
  CompanyProfileResponseType,
  IndividualProfileResponseType,
} from '../../../types/profileType';
import { getPresignedURL } from '../../../apis/commonAPI';
import { ChangeEvent, useContext } from 'react';
import { ToastContext } from '../../../contexts/toastContext';
import { CATEGORY_LABELS } from '../../../constants/categoryMapper';
import { Image } from '../../common/image/Image';

interface MyProfileCardPropsType {
  userData: IndividualProfileResponseType | CompanyProfileResponseType;
  status: 'main' | 'edit' | 'save';
  onClickButton?: () => void;
  selectedImage: string;
  onChangeProfileImage: (imageURL: string) => void;
}

export const MyProfileCard = ({
  status,
  userData,
  onClickButton,
  onChangeProfileImage,
  selectedImage,
}: MyProfileCardPropsType) => {
  const IMAGE_BASE_URL = import.meta.env.VITE_S3_URL;
  const userType = userData.userType == 'COMPANY' ? '기업' : '개인';

  const { errorToast } = useContext(ToastContext);

  const imageLoader = async (image: File) => {
    const fileExt = image.name.split('.').pop();
    const safeFileName = `${uuidv4()}.${fileExt}`;

    try {
      const presignedURL = await getPresignedURL({
        fileName: encodeURIComponent(safeFileName),
        fileType: image.type,
      });
      await axios.put(presignedURL, image, {
        headers: { 'Content-Type': image.type },
      });
      return `${IMAGE_BASE_URL}/${safeFileName}`;
    } catch {
      errorToast(`업로드에 실패하였습니다`);
    }
  };

  const handleChangeProfileImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const imageURL = await imageLoader(e.target.files?.[0]);
      onChangeProfileImage(imageURL || '');
    }
  };

  return (
    <div className={classNames(styles.container)}>
      <div className={classNames(styles.profileContainer)}>
        {selectedImage ? (
          <Image
            className={classNames(styles.profile)}
            src={selectedImage}
            alt='프로필 이미지'
          />
        ) : (
          <div className={classNames(styles.profile)} />
        )}
        <div className={classNames(styles.info)}>
          <Label
            text={userType}
            type={userType === '기업' ? 'corporate' : 'personal'}
          />
          <h1 className={classNames(styles.name)}>{userData.nickname}</h1>
          {(status === 'edit' || status === 'save') && (
            <div className={classNames(styles.position)}>
              {userData.specializations.map((specialization) => (
                <span key={specialization}>
                  {CATEGORY_LABELS[specialization]}
                </span>
              ))}
            </div>
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
        <label className={classNames(styles.profileEditButton)}>
          프로필 사진 수정
          <input
            type='file'
            onChange={handleChangeProfileImage}
            className={classNames(styles.imageInput)}
          />
        </label>
      )}
    </div>
  );
};
