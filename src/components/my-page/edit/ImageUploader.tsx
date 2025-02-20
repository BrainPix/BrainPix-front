import React, { ChangeEvent } from 'react';
import styles from './imageUploader.module.scss';
import MainImage from '../../../assets/icons/mainImage.svg?react';

interface ImageUploaderProps {
  previewImageUrl: string | null;
  handleFileUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  handleImageUpload: () => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  previewImageUrl,
  handleFileUpload,
  handleImageUpload,
}) => {
  return (
    <div className={styles.formGroup}>
      <input
        id='fileInput'
        type='file'
        onChange={handleFileUpload}
        style={{ display: 'none' }}
        accept='image/*'
      />
      {previewImageUrl ? (
        <div
          className={styles.imagePreviewContainer}
          onClick={handleImageUpload}
          role='button'
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleImageUpload();
            }
          }}>
          <img
            src={previewImageUrl}
            alt='Selected'
            className={styles.imagePreview}
          />
        </div>
      ) : (
        <MainImage
          onClick={handleImageUpload}
          className={styles.mainImage}
        />
      )}
    </div>
  );
};
