import classNames from 'classnames';
import styles from './skillInput.module.scss';
import { LevelCheckboxGroup } from '../common/levelCheckboxGroup/LevelCheckboxGroup';

export const SkillInput = () => {
  const handleCheckLevel = (level: string) => {
    console.log(level);
  };
  return (
    <div className={classNames(styles.container)}>
      <input
        placeholder='기술 (텍스트)'
        className={classNames(styles.skillNameInput)}
      />
      <div className={classNames(styles.levelCheckboxWrapper)}>
        <LevelCheckboxGroup onChangeLevel={handleCheckLevel} />
      </div>
    </div>
  );
};
