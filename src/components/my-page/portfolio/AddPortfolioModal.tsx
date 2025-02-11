import { forwardRef, useContext, useRef, useState } from 'react';
import classNames from 'classnames';
import styles from './addPortfolioModal.module.scss';
import ReactQuill from 'react-quill-new';
import { QuillToolbar } from './QuillToolbar';
import { FieldValues, useForm, Controller } from 'react-hook-form';
import axios from 'axios';

import ImageInput from '../../../assets/icons/imageInput.svg?react';
import { Dropdown } from '../../common/dropdown/Dropdown';
import 'react-quill-new/dist/quill.snow.css';
import '../../../styles/quillStyles.css';
import { CATEGORY_MAPPER_TO_ENG } from '../../../constants/categoryMapper';
import { useMutation } from '@tanstack/react-query';
import { PostPortfolioPayload } from '../../../types/myPageType';
import { postPorfolio } from '../../../apis/portfolio';
import { getPresignedURL } from '../../../apis/commonAPI';
import { ToastContext } from '../../../contexts/toastContext';

interface AddPortfolioModalPropsType {
  onClose: () => void;
}

export const AddPortfolioModal = forwardRef<
  HTMLDivElement,
  AddPortfolioModalPropsType
>(({ onClose }, ref) => {
  const modules = {
    toolbar: { container: '#toolbar' },
  };
  const { errorToast } = useContext(ToastContext);
  const IMAGE_BASE_URL = import.meta.env.VITE_S3_URL;

  const { mutate: postPortfolioMutate } = useMutation({
    mutationFn: (formData: PostPortfolioPayload) => postPorfolio(formData),
  });

  const imageLoader = async (image: File) => {
    try {
      const presignedURL = await getPresignedURL({
        fileName: encodeURIComponent(image.name),
        fileType: image.type,
      });
      await axios.put(presignedURL, image, {
        headers: { 'Content-Type': image.type },
      });
      return presignedURL;
    } catch {
      errorToast(`업로드에 실패하였습니다`);
    }
  };

  const quillRef = useRef<ReactQuill>(null);
  const { register, handleSubmit, control } = useForm();
  const [specializations, setSpecializations] = useState('');

  const handleSubmitHandler = async (payload: FieldValues) => {
    const fileImage = payload.image;
    const imageURL = await imageLoader(fileImage[0]);

    if (!imageURL) return;

    const requestBody = {
      title: String(payload.title),
      specializations: [CATEGORY_MAPPER_TO_ENG[specializations]],
      startDate: String(payload.startDate),
      endDate: String(payload.endDate),
      profileImage: `${IMAGE_BASE_URL}/${fileImage[0].name}`,
      content: String(payload.content),
    };

    console.log(requestBody);
    postPortfolioMutate(requestBody);
  };

  const handleSelectSpecialization = (option: string) => {
    setSpecializations(option);
  };

  return (
    <div
      className={classNames(styles.container)}
      ref={ref}>
      <h1 className={classNames(styles.title)}>포트폴리오 추가</h1>
      <hr className={classNames(styles.titleDivider)} />
      <form
        className={classNames(styles.contentContainer)}
        onSubmit={handleSubmit(handleSubmitHandler)}>
        <label htmlFor='imageInput'>
          <div className={classNames(styles.imageInputLabel)}>
            <ImageInput
              width={48}
              height={48}
            />
            대표사진
          </div>
          <input
            id='imageInput'
            type='file'
            alt='이미지'
            accept='image/*'
            className={classNames(styles.imageInput)}
            {...register('image')}
          />
        </label>
        <input
          className={classNames(styles.titleInput)}
          type='text'
          placeholder='제목을 입력하세요.'
          {...register('title')}
        />
        <div className={classNames(styles.infoInputWrapper)}>
          <div className={classNames(styles.categoryInputWrapper)}>
            <h3 className={classNames(styles.inputTitle)}>카테고리</h3>
            <Dropdown
              onSelect={handleSelectSpecialization}
              selectedBoxClassName={styles.categoryDropdown}
              optionBoxClassName={styles.categoryOptionsBoxDropdown}
            />
          </div>
          <div>
            <h3 className={classNames(styles.inputTitle)}>프로젝트 기간</h3>
            <div className={classNames(styles.dateInputWrapper)}>
              <input
                placeholder='시작 날짜 선택'
                {...register('startDate')}
              />
              <hr className={classNames(styles.divider)} />
              <input
                placeholder='종료 날짜 선택'
                {...register('endDate')}
              />
            </div>
          </div>
        </div>
        <div>
          <div className={classNames(styles.inputTitle)}>포트폴리오 내용</div>
          <div className={classNames(styles.contentInputWrapper)}>
            <QuillToolbar />
            <Controller
              name='content'
              control={control}
              render={({ field }) => (
                <ReactQuill
                  {...field}
                  ref={quillRef}
                  modules={modules}
                  className={classNames(styles.textInput)}
                  placeholder='내용을 입력하세요'
                  onChange={(content: string) => field.onChange(content)}
                />
              )}
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
            className={classNames('buttonFilled-primary', styles.uploadButton)}>
            업로드
          </button>
        </div>
      </form>
    </div>
  );
});

AddPortfolioModal.displayName = 'AddPortfolioModal';
