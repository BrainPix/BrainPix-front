import { forwardRef, useState } from 'react';
import classNames from 'classnames';
import { Dropdown } from '../../common/dropdown/Dropdown';
import styles from './individualInfoPart.module.scss';
import { UseFormRegisterReturn } from 'react-hook-form';
import { useQueryClient } from '@tanstack/react-query';
import {
  CompanyProfileType,
  IndividualProfileType,
} from '../../../types/profileType';
import { INFO_TYPE_MAPPER } from '../../../constants/categoryMapper';

interface IndividualInfoRegisters {
  phone: UseFormRegisterReturn;
  notion: UseFormRegisterReturn;
  github: UseFormRegisterReturn;
}

interface EnterpriseInfoRegisters {
  homepage: UseFormRegisterReturn;
  email: UseFormRegisterReturn;
  phone: UseFormRegisterReturn;
}

interface IndividualInfoPartPropsType {
  editMode: boolean;
  registers: IndividualInfoRegisters | EnterpriseInfoRegisters;
}

export const IndividualInfoPart = forwardRef<
  HTMLInputElement,
  IndividualInfoPartPropsType
>(({ editMode, registers }, ref) => {
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData(['userData']);
  const userType = localStorage.getItem('myType');

  const [selectedLabel, setSelectedLabel] = useState<string>('연락처');
  const isPersonalRegisters = 'notion' in registers;

  const LABEL_OPTIONS =
    (userData as IndividualProfileType).userType === 'INDIVIDUAL'
      ? ['연락처', '노션', '깃허브', '기타']
      : ['홈페이지', '이메일', '전화번호', '기타'];

  const handleSelectLabel = (option: string) => {
    setSelectedLabel(option);
  };

  const registerMap = isPersonalRegisters
    ? {
        노션: registers.notion,
        연락처: registers.phone,
        깃허브: registers.github,
      }
    : {
        홈페이지: registers.homepage,
        이메일: registers.email,
        전화번호: registers.phone,
      };

  const handleRegister = (selectedLabel: string) => {
    switch (selectedLabel) {
      case '노션':
        return registerMap.노션;
      case '깃허브':
        return registerMap.깃허브;
      case '연락처':
        return registerMap.연락처;
      case '홈페이지':
        return registerMap.홈페이지;
      case '이메일':
        return registerMap.이메일;
      case '전화번호':
        return registerMap.전화번호;
    }
  };

  const info =
    userType === 'personal'
      ? (userData as IndividualProfileType).contacts
      : (userData as CompanyProfileType).companyInformations;

  return (
    <div>
      <h1 className={classNames(styles.title)}>
        {userType === 'personal' ? '개별 정보' : '기업 정보'}
        {editMode && (
          <span className={classNames(styles.subTitle)}>{'(최대 500자)'}</span>
        )}
      </h1>
      <div className={classNames(styles.individualInfoWrapper)}>
        {info.map(({ type, value }) => (
          <div
            key={type}
            className={classNames(styles.list)}>
            <span className={classNames(styles.label)}>
              {INFO_TYPE_MAPPER[type]}
            </span>
            <span className={classNames(styles.value)}>{value}</span>
          </div>
        ))}
      </div>
      {editMode && (
        <div className={classNames(styles.editInputWrapper)}>
          <div className={classNames(styles.inputContainer)}>
            <Dropdown
              dropDownClassName={classNames(styles.dropdown)}
              options={LABEL_OPTIONS}
              selectedBoxClassName={classNames(styles.dropdownSelected)}
              optionBoxClassName={classNames(styles.dropdownOptions)}
              onSelect={handleSelectLabel}
            />
            <input
              ref={ref}
              className={classNames(styles.input)}
              {...handleRegister(selectedLabel)}
            />
            <div>
              <label htmlFor='checkbox'>
                <div className={classNames(styles.publicCheckWrapper)}>
                  <div className={classNames(styles.checkboxLabel)} />
                  <span>공개</span>
                  {''}
                </div>
              </label>
              <input
                id='checkbox'
                type='checkbox'
                className={classNames(styles.checkboxInput)}
              />
            </div>
          </div>
          <button
            type='button'
            className={classNames('buttonFilled-grey800', styles.addButton)}>
            추가하기
          </button>
        </div>
      )}
    </div>
  );
});

IndividualInfoPart.displayName = 'IndividualInfoPart';
