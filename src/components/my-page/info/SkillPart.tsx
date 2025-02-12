import { ChangeEvent, forwardRef, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './skillPart.module.scss';
import { UseFormSetValue } from 'react-hook-form';

import { LevelCheckboxGroup } from '../../common/levelCheckboxGroup/LevelCheckboxGroup';
import { IndividualSkillTypeResponseType } from '../../../types/profileType';
import {
  SKILL_PROFICIENCY_MAPPER,
  SKILL_PROFICIENCY_MAPPER_TO_ENG,
} from '../../../constants/categoryMapper';

interface FieldValuesType {
  profileImage: string;
  selfIntroduction: string;
  stackOpen: boolean;
  careerOpen: boolean;
}

interface SkillPartPropsType {
  editMode: boolean;
  setValue: UseFormSetValue<FieldValuesType>;
  onClickAdd: (data: IndividualSkillTypeResponseType) => void;
  skills: IndividualSkillTypeResponseType[];
}

export const SkillPart = forwardRef<HTMLInputElement, SkillPartPropsType>(
  ({ editMode, setValue, onClickAdd, skills }, ref) => {
    const skillInputRef = useRef<HTMLInputElement | null>(null);
    const [selectedSkill, setSelectedSkill] = useState('');
    const [selectedProficiency, setSelectedProficiency] = useState('MEDIUM');
    const [skillOpenChecked, setSkillOpenChecked] = useState(false);

    const handleChangeOpenCheckbox = (checked: boolean) => {
      setValue('stackOpen', checked);
      setSkillOpenChecked(checked);
    };

    const handleChangeSkillInput = (e: ChangeEvent<HTMLInputElement>) => {
      setSelectedSkill(e.target.value);
    };

    return (
      <div>
        <div className={classNames(styles.title)}>
          보유 기술
          {editMode && (
            <div>
              <label htmlFor='skillCheckbox'>
                <div className={classNames(styles.publicCheckWrapper)}>
                  <div className={classNames(styles.skillCheckboxLabel)}>
                    <div
                      className={classNames({
                        [styles.checked]: skillOpenChecked,
                      })}
                    />
                  </div>
                  <span>공개</span>
                  {''}
                </div>
                <input
                  id='skillCheckbox'
                  type='checkbox'
                  ref={ref}
                  onChange={(e) => handleChangeOpenCheckbox(e.target.checked)}
                  className={classNames(styles.checkboxInput)}
                />
              </label>
            </div>
          )}
        </div>
        <div className={classNames(styles.skillInfoWrapper)}>
          <div className={classNames(styles.labelWrapper)}>
            <div className={classNames(styles.label)}>기술</div>
            <hr className={classNames(styles.tableDivider)} />
            <div className={classNames(styles.label)}>수준</div>
          </div>
          {skills?.length > 0 && (
            <div className={classNames(styles.contentContainer)}>
              {skills.map(({ stackName, proficiency }) => (
                <div
                  className={classNames(styles.list)}
                  key={stackName}>
                  <div className={classNames(styles.skillName)}>
                    {stackName}
                  </div>
                  <hr className={classNames(styles.tableDivider)} />
                  <div className={classNames(styles.skillLevel)}>
                    {SKILL_PROFICIENCY_MAPPER[proficiency]}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {editMode && (
          <div className={classNames(styles.editInputWrapper)}>
            <div className={classNames(styles.skillInput)}>
              <input
                placeholder='기술 (텍스트)'
                ref={skillInputRef}
                onChange={handleChangeSkillInput}
                className={classNames(styles.skillNameInput)}
              />
              <div className={classNames(styles.levelCheckboxWrapper)}>
                <LevelCheckboxGroup onChangeLevel={setSelectedProficiency} />
              </div>
            </div>
            <button
              type='button'
              onClick={() => {
                onClickAdd({
                  stackName: selectedSkill,
                  proficiency:
                    SKILL_PROFICIENCY_MAPPER_TO_ENG[selectedProficiency],
                });
                if (skillInputRef.current) {
                  skillInputRef.current.value = '';
                }
              }}
              className={classNames('buttonFilled-grey700', styles.addButton)}>
              추가하기
            </button>
          </div>
        )}
      </div>
    );
  },
);

SkillPart.displayName = 'SkillPart';
