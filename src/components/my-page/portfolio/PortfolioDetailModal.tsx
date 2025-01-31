import { forwardRef, useState } from 'react';
import classNames from 'classnames';
import styles from './portfolioDetailModal.module.scss';

import ImageInput from '../../../assets/icons/imageInput.svg?react';

interface PortfolioDetailModalPropsType {
  onClose: () => void;
}

export const PortfolioDetailModal = forwardRef<
  HTMLDivElement,
  PortfolioDetailModalPropsType
>(({ onClose }, ref) => {
  const [editMode, setEditMode] = useState(false);

  const handleClickEditButton = () => {
    if (editMode) {
      return setEditMode(false);
    }
    setEditMode(true);
  };
  return (
    <div
      className={classNames(styles.container)}
      ref={ref}>
      <div className={classNames(styles.titleWrapper)}>
        <h1 className={classNames(styles.title)}>포트폴리오 제목</h1>
        <button
          onClick={handleClickEditButton}
          className={classNames('buttonOutlined-grey500', styles.editButton)}>
          {editMode ? '수정완료' : '수정하기'}
        </button>
      </div>
      <hr className={classNames(styles.titleDivider)} />
      <div className={classNames(styles.contentContainer)}>
        <div className={classNames(styles.infoContainer)}>
          <div className={classNames(styles.infoWrapper)}>
            <span>카테고리 </span>
            <hr className={classNames(styles.infoDivider)} />
            <input
              defaultValue={'디자인'}
              disabled={!editMode}
            />
          </div>
          <div className={classNames(styles.infoWrapper)}>
            <span>프로젝트 기간 </span>
            <hr className={classNames(styles.infoDivider)} />
            <input
              defaultValue={'2024/08 - 2024/12'}
              disabled={!editMode}
            />
          </div>
        </div>
        <label
          htmlFor='imageInput'
          className={classNames(styles.imageInputLabel)}>
          <ImageInput
            width={41}
            height={41}
          />
          대표사진
        </label>
        <input
          id='imageInput'
          type='file'
          alt='이미지'
          className={classNames(styles.imageInput)}
        />
        <div className={classNames(styles.titleWrapper)}>
          <h1 className={classNames(styles.title)}>포트폴리오 내용</h1>
        </div>
        <textarea
          disabled={!editMode}
          className={classNames(styles.contentInput)}
        />
        <div className={classNames(styles.deleteButtonWrapper)}>
          <button
            type='button'
            onClick={onClose}
            className={classNames(styles.cancelButton)}>
            닫기
          </button>
          <button
            type='button'
            className={classNames('buttonFilled-primary', styles.deleteButton)}>
            삭제하기
          </button>
        </div>
      </div>
    </div>
  );
});

PortfolioDetailModal.displayName = 'PortfolioDetailModal';
