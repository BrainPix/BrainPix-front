import { ChangeEvent, forwardRef, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './experiencePart.module.scss';

import { IndividualCareerResponseType } from '../../../types/profileType';
import { UseFormSetValue } from 'react-hook-form';
import { formatBirth } from '../../../utils/formatBirth';

interface FieldValuesType {
  profileImage: string;
  selfIntroduction: string;
  stackOpen: boolean;
  careerOpen: boolean;
  businessInfo: string;
}

interface ExperiencePartPropsType {
  editMode: boolean;
  setValue: UseFormSetValue<FieldValuesType>;
  careers: IndividualCareerResponseType[];
  onClickAdd: (data: IndividualCareerResponseType) => void;
  onDelete: (experienceName: string) => void;
}

export const ExperiencePart = forwardRef<
  HTMLInputElement,
  ExperiencePartPropsType
>(({ editMode, setValue, careers, onClickAdd, onDelete }, ref) => {
  const [experienceOpenChecked, setExperienceOpenChecked] = useState(false);
  const startDateRef = useRef<HTMLInputElement>(null);
  const endDateRef = useRef<HTMLInputElement>(null);

  const [careerName, setCareerName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleChangeCheckbox = (checked: boolean) => {
    setValue('careerOpen', checked);
    setExperienceOpenChecked(checked);
  };

  const handleChangeCareerNameInput = (e: ChangeEvent<HTMLInputElement>) => {
    setCareerName(e.target.value);
  };

  const handleChangeStartDateInput = (e: ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatBirth(e.target.value);
    e.target.value = formattedValue;
    setStartDate(formattedValue);
  };

  const handleChangeEndDateInput = (e: ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatBirth(e.target.value);
    e.target.value = formattedValue;
    setEndDate(formattedValue);
  };

  const handleClickAddButton = () => {
    const addedCareer = {
      content: careerName,
      startDate,
      endDate,
    };
    onClickAdd(addedCareer);
  };

  return (
    <div>
      <div className={classNames(styles.title)}>
        경력 사항
        {editMode && (
          <div>
            <label htmlFor='experineceOpenCheck'>
              <div className={classNames(styles.publicCheckWrapper)}>
                <div className={classNames(styles.checkboxLabel)}>
                  <div
                    className={classNames({
                      [styles.checked]: experienceOpenChecked,
                    })}
                  />
                </div>
                <span>공개</span>
                {''}
              </div>
            </label>
            <input
              id='experineceOpenCheck'
              type='checkbox'
              ref={ref}
              onChange={(e) => handleChangeCheckbox(e.target.checked)}
              className={classNames(styles.checkboxInput)}
            />
          </div>
        )}
      </div>
      <div className={classNames(styles.experienceWrapper)}>
        <div
          className={classNames(styles.labelWrapper, {
            [styles.editMode]: editMode,
          })}>
          <div className={classNames(styles.label)}>직무</div>
          <hr className={classNames(styles.tableDivider)} />
          <div className={classNames(styles.label)}>기간</div>
        </div>
        <div className={classNames(styles.listContainer)}>
          {careers.map(({ content, startDate, endDate }) => (
            <div
              key={content}
              className={classNames(styles.listWrapper)}>
              <div
                className={classNames(styles.list, {
                  [styles.editMode]: editMode,
                })}>
                <div className={classNames(styles.experience)}>{content}</div>
                <hr className={classNames(styles.tableDivider)} />
                <div className={classNames(styles.date)}>
                  {startDate} - {endDate}
                </div>
              </div>
              {editMode && (
                <button
                  onClick={() => onDelete(content)}
                  className={classNames(styles.deleteButton)}>
                  삭제
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
      {editMode && (
        <div className={classNames(styles.editInputWrapper)}>
          <div className={classNames(styles.experienceInput)}>
            <input
              placeholder='직무 내용'
              onChange={handleChangeCareerNameInput}
              className={classNames(styles.input, styles.contentInput)}
            />
            <div className={classNames(styles.dateInputWrapper)}>
              <input
                ref={startDateRef}
                maxLength={7}
                onChange={handleChangeStartDateInput}
                placeholder='시작 날짜 선택'
                className={classNames(styles.input, styles.startDate)}
              />
              <div className={classNames(styles.inputDivider)} />
              <input
                ref={endDateRef}
                placeholder='종료 날짜 선택'
                maxLength={7}
                onChange={handleChangeEndDateInput}
                className={classNames(styles.input, styles.endDate)}
              />
            </div>
          </div>
          <button
            type='button'
            onClick={handleClickAddButton}
            className={classNames('buttonFilled-grey700', styles.addButton)}>
            추가하기
          </button>
        </div>
      )}
    </div>
  );
});

ExperiencePart.displayName = 'ExperiencePart';
