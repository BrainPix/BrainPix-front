import React from 'react';
import ReactQuill from 'react-quill-new';
import styles from '../../../pages/idea-market/ideaMarketRegister.module.scss';

interface ContentEditorProps {
  value: string;
  onChange: (content: string) => void;
  quillRef: React.RefObject<ReactQuill>;
  modules: { [key: string]: object };
  formats: string[];
}

export const ContentEditor = ({
  value,
  onChange,
  quillRef,
  modules,
  formats,
}: ContentEditorProps) => {
  return (
    <div className={styles.formGroup}>
      <label
        htmlFor='editor'
        className={styles.visuallyHidden}>
        아이디어 내용
      </label>
      <ReactQuill
        ref={quillRef}
        id='editor'
        value={value}
        onChange={onChange}
        className={styles.editor}
        theme='snow'
        modules={modules}
        formats={formats}
        placeholder='아이디어 내용을 입력하세요. (필수)'
      />
    </div>
  );
};
