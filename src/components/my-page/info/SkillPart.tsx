import classNames from 'classnames';
import styles from './skillPart.module.scss';
import { LevelCheckboxGroup } from '../../common/levelCheckboxGroup/LevelCheckboxGroup';

interface SkillPartPropsType {
  editMode: boolean;
}

export const SkillPart = ({ editMode }: SkillPartPropsType) => {
  const handleClick = (value: string) => {
    console.log(value);
  };

  return (
    <div>
      <div className={classNames(styles.title)}>
        보유 기술
        {editMode && (
          <div className={classNames(styles.publicCheckboxWrapper)}>
            <input type='checkbox' />
            <span>공개여부</span>
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
          <div className={classNames(styles.list)}>
            <div className={classNames(styles.skillName)}>파이썬</div>
            <hr className={classNames(styles.tableDivider)} />
            <div className={classNames(styles.skillLevel)}>상</div>
          </div>
          <div className={classNames(styles.list)}>
            <div className={classNames(styles.skillName)}>액셀</div>
            <hr className={classNames(styles.tableDivider)} />
            <div className={classNames(styles.skillLevel)}>상</div>
          </div>
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
            className={classNames('buttonFilled-grey800', styles.addButton)}>
            추가하기
          </button>
        </div>
      )}
    </div>
  );
};
