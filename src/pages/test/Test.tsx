import { useState } from 'react';

import classNames from 'classnames';
import styles from './test.module.scss';
//버튼그룹 test
import ButtonGroup from '../../components/common/button/ButtonGroup.tsx';

//드롭다운 버튼 test
import Dropdown from '../../components/common/dropdown/Dropdown.tsx';

//라벨 test
import Label from '../../components/common/label/Label.tsx';

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
      <button className='buttonFilled-grey800'>dd</button>
      {/* 라벨 test */}
      <div>
        <Label
          text='기업'
          type='corporate'
        />
        <Label
          text='기업 공개'
          type='corporatePublic'
        />
        <Label
          text='개인'
          type='personal'
        />
        <Label
          text='자체 공모'
          type='selfOffer'
        />
      </div>
    </div>
  );
};
