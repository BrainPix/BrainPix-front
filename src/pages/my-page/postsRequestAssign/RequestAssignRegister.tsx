import styles from './RequestAssignRegister.module.scss';
import { useState } from 'react';
import { Dropdown } from '../../../components/common/dropdown/Dropdown';

export const RequestAssignRegister = () => {
  const [category, setCategory] = useState('');
  const [pageSetting, setPageSetting] = useState('Open Idea');
  const [techZone, setTechZone] = useState('Tech Zone');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <>
      <h2>요청과제 등록하기</h2>
      <div className={styles.formGroup}>
        <div>
          카테고리 <span className={styles.required}>(필수)</span>
          <Dropdown />
        </div>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}>
          <option value=''>분야별</option>
          <option value='개발'>개발</option>
          <option value='디자인'>디자인</option>
        </select>
      </div>
      <div className={styles.formGroup}>
        <div>
          페이지 설정 <span className={styles.required}>(필수)</span>
        </div>
        <div className={styles.pageSettings}>
          <button className={styles.active}>{pageSetting}</button>
          <span>|</span>
          <button>{techZone}</button>
        </div>
        <button className={styles.openIdeaDesc}>Open Idea 설명 ▼</button>
      </div>
      <div className={styles.imageUpload}>
        <div className={styles.imagePlaceholder}>대표사진</div>
      </div>
      <input
        type='text'
        placeholder='제목을 입력하세요'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.titleInput}
      />
      <textarea
        placeholder='내용을 입력하세요'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className={styles.textArea}
      />
      <div className={styles.editorOptions}>
        <span>기본서체</span>
        <span>15 pt</span>
        <span>왼쪽 정렬</span>
        <span className={styles.link}>이미지 첨부</span>
        <span className={styles.link}>하이퍼링크</span>
      </div>
    </>
  );
};
