import { ChangeEvent, forwardRef } from 'react';
import classNames from 'classnames';
import styles from './introducePart.module.scss';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import {
  CompanyProfileType,
  FieldValuesType,
  IndividualProfileType,
} from '../../../types/profileType';

interface IntroducePartPropsType {
  editMode: boolean;
  watch: UseFormWatch<FieldValuesType>;
  setValue: UseFormSetValue<FieldValuesType>;
}

export const IntroducePart = forwardRef<
  HTMLTextAreaElement,
  IntroducePartPropsType
>(({ editMode = false, setValue, ...rest }, ref) => {
  const queryClinet = useQueryClient();

  const userData = queryClinet.getQueryData(['userData']);
  const userType = localStorage.getItem('myType');

  const introducingText =
    userType === 'personal'
      ? (userData as IndividualProfileType).selfIntroduction
      : (userData as CompanyProfileType).selfIntroduction;

  setValue('introduce', introducingText);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setValue('introduce', e.target.value);
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
