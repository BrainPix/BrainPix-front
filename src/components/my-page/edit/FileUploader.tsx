import React, { ChangeEvent } from 'react';
import styles from './fileUploader.module.scss';

interface FileUploaderProps {
  pdfFile: File | null;
  handlePdfUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  handlePdfClick: () => void;
  pdfInputRef: React.RefObject<HTMLInputElement>;
}

export const FileUploader = ({
  pdfFile,
  handlePdfUpload,
  handlePdfClick,
  pdfInputRef,
}: FileUploaderProps) => {
  return (
    <div className={styles.fileUploadGroup}>
      <div className={styles.fileUploadLabel}>
        <span className={styles.labelText}>첨부파일</span>
        <span className={styles.pdfText}>(PDF)</span>
        <div className={styles.pcButton}>
          <span>내 PC</span>
        </div>
      </div>
      <div
        className={styles.fileUploadBox}
        onClick={handlePdfClick}>
        <span className={styles.placeholder}>
          {pdfFile ? pdfFile.name : '파일이 업로드 되지 않았습니다.'}
        </span>
      </div>
      <input
        ref={pdfInputRef}
        type='file'
        onChange={handlePdfUpload}
        style={{ display: 'none' }}
        accept='.pdf'
      />
    </div>
  );
};
