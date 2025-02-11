import { forwardRef, useState } from 'react';
import classNames from 'classnames';
import styles from './portfolioDetailModal.module.scss';

import { useQuery } from '@tanstack/react-query';
import { getPorfolioDetail } from '../../../apis/portfolio';
import { PortfolioDetailResponseType } from '../../../types/myPageType';
import { CATEGORY_LABELS } from '../../../constants/categoryMapper';

interface PortfolioDetailModalPropsType {
  onClose: () => void;
  cardId: number;
}

export const PortfolioDetailModal = forwardRef<
  HTMLDivElement,
  PortfolioDetailModalPropsType
>(({ onClose, cardId }, ref) => {
  const [editMode, setEditMode] = useState(false);

  const { data: cardData } = useQuery({
    queryKey: ['clickedCardData'],
    queryFn: () => getPorfolioDetail(cardId),
  });

  console.log(cardData);
  const { title, specializations, startDate, endDate, content, profileImage } =
    cardData.data as PortfolioDetailResponseType;

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
        <h1 className={classNames(styles.title)}>{title}</h1>
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
              defaultValue={CATEGORY_LABELS[specializations[0]]}
              disabled={!editMode}
            />
          </div>
          <div className={classNames(styles.infoWrapper)}>
            <span>프로젝트 기간 </span>
            <hr className={classNames(styles.infoDivider)} />
            <input
              defaultValue={`${startDate} - ${endDate}`}
              disabled={!editMode}
            />
          </div>
        </div>
        <img
          alt='포트폴리오 사진'
          src={profileImage}
          className={classNames(styles.imageInputLabel)}
        />
        {/* <label
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
        /> */}
        <div className={classNames(styles.titleWrapper)}>
          <h1 className={classNames(styles.title)}>포트폴리오 내용</h1>
        </div>
        <textarea
          disabled={!editMode}
          className={classNames(styles.contentInput)}
          value={content}
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
