import styles from './requestAssignRegister.module.scss';
import { useState, useRef } from 'react';
import { Dropdown } from '../../../components/common/dropdown/Dropdown';
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';
import ImageInput from '../../../assets/icons/imageInput.svg?react';
import '../../../styles/quillStyles.css';
import { QuillToolbar } from '../../../components/my-page/portfolio/QuillToolbar';

export const RequestAssignRegister = () => {
  // const [category, setCategory] = useState('');
  // const [pageSetting, setPageSetting] = useState('Open Idea');
  // const [techZone, setTechZone] = useState('Tech Zone');
  const [title, setTitle] = useState('');
  //const [content, setContent] = useState('');
  const quillRef = useRef<ReactQuill>(null);

  const modules = {
    toolbar: { container: '#toolbar' },
  };

  return (
    <div>
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
          </div>
        </div>
      </div>
      <label className={styles.imageUpload}>
        <label htmlFor='imageInput'>
          <div className={styles.imageInputLabel}>
            <ImageInput
              width={48}
              height={48}
            />
            대표사진
          </div>
        </label>
        <input
          id='imageInput'
          type='file'
          alt='이미지'
          className={styles.imageInput}
        />
      </label>
      <div className={styles.content}>
        <input
          type='text'
          placeholder='제목을 입력하세요'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className={styles.titleInput}
        />
        <div className={styles.editorContainer}>
          <QuillToolbar />
          <ReactQuill
            ref={quillRef}
            modules={modules}
            className={styles.textEditer}
            placeholder='내용을 입력하세요'
          />
        </div>
      </div>
      <div className={styles.attachmentSection}>
        <label htmlFor='attachmentInput'>첨부파일 (PDF)</label>
        <input
          id='attachmentInput'
          type='file'
          className={styles.attachmentInput}
        />
      </div>
      <div className={styles.recruitmentSection}>
        <h3>
          모집 분야 및 인원 설정{' '}
          <span className={styles.required}>(필수 : 수정 불가)</span>
        </h3>
        <div className={styles.recruitmentTable}>
          <div className={styles.recruitmentRow}>
            <span>디자이너</span>
            <input
              type='number'
              value='1'
              readOnly
            />
            <input
              type='text'
              placeholder='제안 금액'
            />
            <select>
              <option>원추후 협의</option>
            </select>
          </div>
          <div className={styles.recruitmentRow}>
            <span>PM</span>
            <input
              type='number'
              value='1'
              readOnly
            />
            <input
              type='text'
              placeholder='제안 금액'
            />
            <select>
              <option>원추후 협의</option>
            </select>
          </div>
        </div>
      </div>
      <div className={styles.deadlineSection}>
        <h3>
          모집 기한 설정 <span className={styles.required}>(필수)</span>
        </h3>
        <div className={styles.deadlineInputs}>
          <input
            type='number'
            placeholder='년'
          />
          <input
            type='number'
            placeholder='월'
          />
          <input
            type='number'
            placeholder='일'
          />
        </div>
      </div>
    </div>
  );
};
