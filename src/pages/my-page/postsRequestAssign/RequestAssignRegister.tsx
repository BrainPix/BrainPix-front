import styles from './RequestAssignRegister.module.scss';
import { useState } from 'react';
import { Dropdown } from '../../../components/common/dropdown/Dropdown';
//import MainImage from '../../../assets/images/requestRegisterPostImage.png';

export const RequestAssignRegister = () => {
  const [category, setCategory] = useState('');
  const [pageSetting, setPageSetting] = useState('Open Idea');
  const [techZone, setTechZone] = useState('Tech Zone');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>요청과제 등록하기</h2>
      <div className={styles.formGroup}>
        <div className={styles.selectContainer}>
          <div className={styles.category}>
            <span className={styles.text}>카테고리</span>
            <span className={styles.required}>(필수)</span>
            <Dropdown />
          </div>
          <div className={styles.pageSetting}>
            <span className={styles.text}>페이지 설정</span>
            <span className={styles.required}>(필수)</span>
            {/* 컴포넌트 */}
            <div>
              <button className={styles.active}>{pageSetting}</button>
              <span>|</span>
              <button>{techZone}</button>
              <button className={styles.openIdeaDesc}>Open Idea 설명 ▼</button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.imageUpload}>
        <div className={styles.imagePlaceholder}>대표사진</div>
      </div>
      <div className={styles.content}>
        <input
          type='text'
          placeholder='제목을 입력하세요'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.titleInput}
        />
        <div className={styles.editorOptions}>
          <span>기본서체</span>
          <span>15 pt</span>
          <span>왼쪽 정렬</span>
          <span className={styles.link}>이미지 첨부</span>
          <span className={styles.link}>하이퍼링크</span>
        </div>
        <textarea
          placeholder='내용을 입력하세요'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className={styles.textArea}
        />
      </div>
    </div>
  );
};
