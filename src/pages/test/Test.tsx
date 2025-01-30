import { useState } from 'react';

import classNames from 'classnames';
import styles from './test.module.scss';
//버튼그룹 test
import ButtonGroup from '../../components/common/button/ButtonGroup.tsx';

//드롭다운 버튼 test
import Dropdown from '../../components/common/dropdown/Dropdown.tsx';

//라벨 test
import CorporateLabel from '../../components/common/label/CorporateLabel.tsx';
import PersonalLabel from '../../components/common/label/PersonalLabel.tsx';
import CorporatePublicLabel from '../../components/common/label/CorporatePublicLabel.tsx';

//마이페이지 게시물 관리 컴포넌트 test
import { PostRecord } from '../../components/post-record/PostRecord.tsx';

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
      <CorporateLabel />
      <PersonalLabel />
      <CorporatePublicLabel />
      {/* 마이페이지 게시물 관리 컴포넌트 test */}
      <div className={styles.postRecordWrapper}>
        <PostRecord
          title='결제 내역'
          records={[
            { id: 'serqe', paymentMethod: '카카오페이', amount: 1000 },
            { id: 'serqe', paymentMethod: '카카오페이', amount: 1000 },
          ]}
          columns={[
            { key: 'id', label: '아이디' },
            { key: 'paymentMethod', label: '결제 수단' },
            { key: 'amount', label: '금액' },
          ]}
        />
      </div>
    </div>
  );
};
