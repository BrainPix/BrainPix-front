import { forwardRef, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Dropdown } from '../../common/dropdown/Dropdown';
import styles from './individualInfoPart.module.scss';
import { useQueryClient } from '@tanstack/react-query';
import {
  CompanyProfileType,
  IndividualContactType,
  IndividualProfileType,
} from '../../../types/profileType';
import { INFO_TYPE_MAPPER } from '../../../constants/categoryMapper';

interface IndividualInfoPartPropsType {
  editMode: boolean;
  onClickAdd: (data: IndividualContactType) => void;
}

export const IndividualInfoPart = forwardRef<
  HTMLInputElement,
  IndividualInfoPartPropsType
>(({ editMode, onClickAdd }, ref) => {
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData(['userData']);
  const userType = localStorage.getItem('myType');
  const [infoOpenChecked, setInfoOpenChecked] = useState(false);

  const [addInfo, setAddInfo] = useState<IndividualContactType>({
    type: '',
    value: '',
    isOpen: false,
  });
  const [selectedSpecialization, setSelectedSpecialization] = useState<
    string[]
  >([]);

  useEffect(() => {
    console.log(addInfo);
  }, [addInfo]);

  const LABEL_OPTIONS =
    (userData as IndividualProfileType).userType === 'INDIVIDUAL'
      ? ['연락처', '노션', '깃허브', '기타']
      : ['홈페이지', '이메일', '전화번호', '기타'];

  const handleSelectLabel = (option: string) => {
    setAddInfo((prev) => {
      return {
        ...prev,
        type: option,
      };
    });
  };

  const handleChangeOpenCheckbox = (checked: boolean) => {
    setInfoOpenChecked(infoOpenChecked);
    setAddInfo((prev) => ({
      ...prev,
      isOpen: checked,
    }));
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
              onChange={(e) =>
                setAddInfo((prev) => ({ ...prev, content: e.target.value }))
              }
              maxLength={500}
              className={classNames(styles.input)}
            />
            <div>
              <label htmlFor='checkbox'>
                <div className={classNames(styles.publicCheckWrapper)}>
                  <div className={classNames(styles.checkboxLabel)}>
                    <div
                      className={classNames({
                        [styles.checked]: infoOpenChecked,
                      })}
                    />
                  </div>
                  <span>공개</span>
                  {''}
                </div>
                <input
                  id='checkbox'
                  type='checkbox'
                  onChange={(e) => handleChangeOpenCheckbox(e.target.checked)}
                  className={classNames(styles.checkboxInput)}
                />
              </label>
            </div>
          </div>
          <button
            type='button'
            onClick={() => onClickAdd(addInfo)}
            className={classNames('buttonFilled-grey800', styles.addButton)}>
            추가하기
          </button>
        </div>
      )}
    </div>
  );
});

IndividualInfoPart.displayName = 'IndividualInfoPart';
