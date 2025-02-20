import { ChangeEvent, useState } from 'react';
import classNames from 'classnames';
import styles from './levelCheckboxGroup.module.scss';

interface LevelCheckboxGroupPropsType {
  initialValue?: string | boolean;
  onChangeLevel: (value: string) => void;
}

export const LevelCheckboxGroup = ({
  initialValue,
  onChangeLevel,
}: LevelCheckboxGroupPropsType) => {
  const [value, setValue] = useState(initialValue);

  const handleClickCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    onChangeLevel(e.target.value);
  };

  return (
    <div className={classNames(styles.skillLevelWrapper)}>
      <div>
        <input
          type='radio'
          id='upper'
          name='level'
          value={'상'}
          onChange={handleClickCheckbox}
          defaultChecked={value === '상'}
          className={classNames(styles.checkBox)}
        />
        <label htmlFor='upper'>상</label>
      </div>
      <div>
        <input
          type='radio'
          id='middle'
          name='level'
          value={'중'}
          onChange={handleClickCheckbox}
          defaultChecked={value === '중'}
          className={classNames(styles.checkBox)}
        />
        <label htmlFor='middle'>중</label>
      </div>
      <div>
        <input
          type='radio'
          id='lower'
          name='level'
          value={'하'}
          onChange={handleClickCheckbox}
          defaultChecked={value === '하'}
          className={classNames(styles.checkBox)}
        />
        <label htmlFor='lower'>하</label>
      </div>
    </div>
  );
};
