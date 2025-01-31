import { forwardRef } from 'react';
import classNames from 'classnames';
import styles from './addPortfolioModal.module.scss';
import ReactQuill from 'react-quill';

import IamgeInput from '../../../assets/icons/imageInput.svg?react';
import Dropdown from '../../common/dropdown/Dropdown';

import 'react-quill/dist/quill.snow.css';
import { QuillToolbar } from './QuillToolbar';

interface AddPortfolioModalPropsType {
  onClose: () => void;
}

export const AddPortfolioModal = forwardRef<
  HTMLDivElement,
  AddPortfolioModalPropsType
>(({ onClose }, ref) => {
  const modules = {
    toolbar: { container: '#toolbar', handlers: {} },
  };

  return (
    <div
      className={classNames(styles.container)}
      ref={ref}>
      <h1 className={classNames(styles.title)}>포트폴리오 추가</h1>
      <hr className={classNames(styles.titleDivider)} />
      <form className={classNames(styles.contentContainer)}>
        <label htmlFor='imageInput'>
          <div className={classNames(styles.imageInputLabel)}>
            <IamgeInput
              width={54}
              height={54}
            />
            대표사진
          </div>
        </label>
        <input
          id='imageInput'
          type='file'
          alt='이미지'
          className={classNames(styles.imageInput)}
        />
        <input
          className={classNames(styles.titleInput)}
          type='text'
          placeholder='제목을 입력하세요.'
        />
        <div className={classNames(styles.infoInputWrapper)}>
          <div className={classNames(styles.categoryInputWrapper)}>
            <h3 className={classNames(styles.inputTitle)}>카테고리</h3>
            <Dropdown />
          </div>
          <div>
            <h3 className={classNames(styles.inputTitle)}>프로젝트 기간</h3>
            <div className={classNames(styles.dateInputWrapper)}>
              <input placeholder='시작 날짜 선택' />
              <hr className={classNames(styles.divider)} />
              <input placeholder='종료 날짜 선택' />
            </div>
          </div>
        </div>
        <div>
          <div className={classNames(styles.inputTitle)}>포트폴리오 내용</div>
          <div className={classNames(styles.contentInputWrapper)}>
            <QuillToolbar />
            <ReactQuill
              modules={modules}
              className={classNames(styles.textInput)}
              placeholder='내용을 입력하세요'
            />
          </div>
        </div>
        <div className={classNames(styles.uploadButtonWrapper)}>
          <button
            type='button'
            onClick={onClose}
            className={classNames(styles.cancelButton)}>
            닫기
          </button>
          <button
            type='submit'
            className={classNames('buttonFilled-grey800', styles.uploadButton)}>
            업로드
          </button>
        </div>
      </form>
    </div>
  );
});

AddPortfolioModal.displayName = 'AddPortfolioModal';
