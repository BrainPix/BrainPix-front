import { useState } from 'react';

import classNames from 'classnames';
import styles from './test.module.scss';

//버튼그룹 test
import ButtonGroup from '../../components/button/ButtonGroup.tsx';

//드롭다운 버튼 test
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
      {/* 버튼그룹 test */}
      <div className={styles.buttonGroupWrapper}>
        <ButtonGroup />
      </div>
      {/* 드롭다운 버튼 test */}
      <div className={styles.dropdown}>
        <Dropdown />
        {/* <Dropdown max_visible_options={7} /> */}
      </div>
    </div>
  );
};
