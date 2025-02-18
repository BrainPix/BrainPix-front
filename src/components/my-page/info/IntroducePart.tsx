import { ChangeEvent, forwardRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import styles from './introducePart.module.scss';
import { UseFormSetValue } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import {
  CompanyProfileResponseType,
  IndividualProfileResponseType,
} from '../../../types/profileType';

interface FieldValuesType {
  profileImage: string;
  selfIntroduction: string;
  stackOpen: boolean;
  careerOpen: boolean;
}

interface IntroducePartPropsType {
  editMode: boolean;
  setValue: UseFormSetValue<FieldValuesType>;
}

export const IntroducePart = forwardRef<
  HTMLTextAreaElement,
  IntroducePartPropsType
>(({ editMode = false, setValue, ...rest }, ref) => {
  const queryClinet = useQueryClient();
  const [userType, setUserType] = useState('');

  const userData =
    userType === 'personal'
      ? queryClinet.getQueryData(['personalUserData'])
      : queryClinet.getQueryData(['companyUserData']);

  useEffect(() => {
    const myUserType = localStorage.getItem('myType');
    if (myUserType) setUserType(myUserType);
  }, []);

  const introducingText =
    userType === 'personal'
      ? (userData as IndividualProfileResponseType)?.selfIntroduction
      : (userData as CompanyProfileResponseType)?.selfIntroduction;

  setValue('selfIntroduction', introducingText);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue('selfIntroduction', e.target.value);
  };

  return (
    <div>
      <h1 className={classNames(styles.title)}>
        {userType === 'personal' ? '자기 소개' : '기업 소개'}
      </h1>
      <textarea
        className={classNames(styles.introduceWrapper)}
        onChange={handleChange}
        disabled={!editMode}
        ref={ref}
        {...rest}
      />
    </div>
  );
});

IntroducePart.displayName = 'IntroducePart';
