import { useState } from 'react';

import classNames from 'classnames';
import styles from './test.module.scss';

//버튼그룹 test 
import ButtonGroup from '../../components/button/ButtonGroup.tsx';

export const Test = () => {
  const [clicked, setClicked] = useState(false);
  const handleClickButton = () => {
    setClicked(!clicked);
  };

  //버튼그룹 test
  const handleCancel = () => {
    alert('취소 버튼 클릭됨');
  };

  const handleSubmit = () => {
    alert('등록 버튼 클릭됨');
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
        <ButtonGroup onCancel={handleCancel} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};
