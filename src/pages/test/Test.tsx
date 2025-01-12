import { useState } from 'react';

import classNames from 'classnames';
import styles from './test.module.scss';
import Dropdown from '../../components/dropdown/Dropdown.tsx';

export const Test = () => {
  const [clicked, setClicked] = useState(false);
  const handleClickButton = () => {
    setClicked(!clicked);
  };
  return (
    <div className={classNames(styles.container)}>
      테스트 페이지입니다.
      <button
        className={classNames(styles.t, {
          [styles.clicked]: clicked,
        })}
        onClick={handleClickButton}>
        테스트 버튼
      </button>
      <Dropdown />
      <Dropdown maxVisibleOptions = {20}/>
    </div>
  );
};
