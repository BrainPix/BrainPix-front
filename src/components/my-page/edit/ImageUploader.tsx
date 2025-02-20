import React, { ChangeEvent } from 'react';
import styles from './imageUploader.module.scss';
import MainImage from '../../../assets/icons/mainImage.svg?react';
import { Image } from '../../common/image/Image';

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
          <Image
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
