import { forwardRef, useState } from 'react';
import classNames from 'classnames';
import Dropdown from '../../common/dropdown/Dropdown';
import styles from './individualInfoPart.module.scss';
import { UseFormRegisterReturn } from 'react-hook-form';

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
  userData: {
    연락처: string;
    노션: string;
    깃허브: string;
  };
  registers: IndividualInfoRegisters | EnterpriseInfoRegisters;
  userType: '개인' | '기업';
}

export const IndividualInfoPart = forwardRef<
  HTMLInputElement,
  IndividualInfoPartPropsType
>(({ editMode, userData, registers, userType }, ref) => {
  const [selectedLabel, setSelectedLabel] = useState<string>('연락처');
  const isIndividualRegisters = 'notion' in registers;
  const LABEL_OPTIONS =
    userType === '개인'
      ? ['연락처', '노션', '깃허브']
      : ['홈페이지', '이메일', '전화번호', '기타'];

  const handleSelectLabel = (option: string) => {
    setSelectedLabel(option);
  };

  const registerMap = isIndividualRegisters
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

  return (
    <div>
      <h1 className={classNames(styles.title)}>
        {userType === '개인' ? '개별 정보' : '기업 정보'}
        {editMode && (
          <span className={classNames(styles.subTitle)}>{'(최대 500자)'}</span>
        )}
      </h1>
      <div className={classNames(styles.individualInfoWrapper)}>
        {Object.entries(userData).map(([key, value]) => (
          <div
            key={key}
            className={classNames(styles.list)}>
            <span className={classNames(styles.label)}>{key}</span>
            <span className={classNames(styles.value)}>{value}</span>
          </div>
        ))}
      </div>
      {editMode && (
        <div className={classNames(styles.editInputWrapper)}>
          <div className={classNames(styles.inputContainer)}>
            <Dropdown
              options={LABEL_OPTIONS}
              customClassName={classNames(styles.dropdown)}
              onSelect={handleSelectLabel}
            />
            <input
              ref={ref}
              className={classNames(styles.input)}
              {...handleRegister(selectedLabel)}
            />
            <div className={classNames(styles.publicCheckWrapper)}>
              <input
                type='checkbox'
                className={classNames(styles.checkbox)}
              />
              공개여부
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
