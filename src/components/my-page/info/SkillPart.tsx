import classNames from 'classnames';
import styles from './skillPart.module.scss';
import { useQueryClient } from '@tanstack/react-query';

import { LevelCheckboxGroup } from '../../common/levelCheckboxGroup/LevelCheckboxGroup';
import { IndividualProfileType } from '../../../types/profileType';
import { SKILL_PROFICIENCY_MAPPER } from '../../../constants/categoryMapper';

interface SkillPartPropsType {
  editMode: boolean;
}

export const SkillPart = ({ editMode }: SkillPartPropsType) => {
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData(['userData']);
  const skillInfo = (userData as IndividualProfileType).stacks;

  const handleClick = () => {};

  return (
    <div>
      <div className={classNames(styles.title)}>
        보유 기술
        {editMode && (
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
        )}
      </div>
      <div className={classNames(styles.skillInfoWrapper)}>
        <div className={classNames(styles.labelWrapper)}>
          <div className={classNames(styles.label)}>기술</div>
          <hr className={classNames(styles.tableDivider)} />
          <div className={classNames(styles.label)}>수준</div>
        </div>
        <div className={classNames(styles.contentContainer)}>
          {skillInfo.map(({ stackName, proficiency }) => (
            <div
              className={classNames(styles.list)}
              key={stackName}>
              <div className={classNames(styles.skillName)}>{stackName}</div>
              <hr className={classNames(styles.tableDivider)} />
              <div className={classNames(styles.skillLevel)}>
                {SKILL_PROFICIENCY_MAPPER[proficiency]}
              </div>
            </div>
          ))}
        </div>
      </div>

      {editMode && (
        <div className={classNames(styles.editInputWrapper)}>
          <div className={classNames(styles.skillInput)}>
            <input
              placeholder='기술 (텍스트)'
              className={classNames(styles.skillNameInput)}
            />
            <div className={classNames(styles.levelCheckboxWrapper)}>
              <LevelCheckboxGroup onChangeLevel={handleClick} />
            </div>
          </div>
          <button
            type='button'
            className={classNames('buttonFilled-grey700', styles.addButton)}>
            추가하기
          </button>
        </div>
      )}
    </div>
  );
};
