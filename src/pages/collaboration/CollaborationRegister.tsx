import React, { useRef, useEffect, useMemo, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import ReactQuill from 'react-quill-new';
import { useNavigate } from 'react-router-dom';
import 'react-quill-new/dist/quill.snow.css';
import styles from './collaborationRegister.module.scss';
import MainImage from '../../assets/icons/mainImage.svg?react';
import DownButton from '../../assets/icons/categoryDownButton.svg?react';
import UpButton from '../../assets/icons/categoryUpButton.svg?react';
import DisabledDownButton from '../../assets/icons/disabledDownButton.svg?react';
import CheckButton from '../../assets/icons/checkButton.svg?react';
import DisabledCheckButton from '../../assets/icons/disabledCheckButton.svg?react';
import { Image } from '../../components/common/image/Image';

interface FormValues {
  category: string;
  teamName: string;
  content: string;
  price: string;
  quantity: number;
  visibility: '전체공개' | '기업공개' | '비공개';
  isPortfolioVisible: boolean;
  attachedFile: FileList | null;
  pdfFile: FileList | null;
}

type CollaborationRegisterProps = {
  [key: string]: never;
};

export const CollaborationRegister: React.FC<
  CollaborationRegisterProps
> = () => {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const quillRef = useRef<ReactQuill>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const { control, handleSubmit, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      category: '',
      teamName: '',
      content: '',
      price: '0',
      quantity: 0,
      visibility: '전체공개',
      isPortfolioVisible: false,
      attachedFile: null,
      pdfFile: null,
    },
  });

  const quantity = watch('quantity');

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files?.[0]) {
      setValue('attachedFile', files);
      const imageUrl = URL.createObjectURL(files[0]);
      setPreviewImageUrl(imageUrl);
    }
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handlePdfUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files?.[0] && files[0].type === 'application/pdf') {
      setValue('pdfFile', files);
    }
  };

  const handlePdfClick = () => {
    pdfInputRef.current?.click();
  };

  const handleQuantityChange = (change: number) => {
    const currentQuantity = watch('quantity');
    const newQuantity = Math.max(0, currentQuantity + change);
    setValue('quantity', newQuantity);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const onSubmit = (_data: FormValues) => {
    navigate('/idea-market/registered/:ideaId');
  };

  useEffect(() => {
    return () => {
      if (previewImageUrl) {
        URL.revokeObjectURL(previewImageUrl);
      }
    };
  }, [previewImageUrl]);

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ font: [] }, { size: [] }, { align: [] }],
          ['link', 'image'],
        ],
        handlers: {
          image: () => {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.click();

            input.onchange = async () => {
              const file = input.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = () => {
                  const quill = quillRef.current?.getEditor();
                  if (quill) {
                    const range = quill.getSelection(true);
                    quill.insertEmbed(range.index, 'image', reader.result);
                  }
                };
                reader.readAsDataURL(file);
              }
            };
          },
        },
      },
    }),
    [],
  );

  const formats = ['font', 'size', 'align', 'link', 'image'];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.container}>
      <div className={styles.title}>팀 빌딩</div>
      <div className={styles.horizontalContainer}>
        <div className={`${styles.formGroup} ${styles.categoryGroup}`}>
          <div className={styles.labelWrapper}>
            <label htmlFor='category'>
              주제 분야 설정
              <span className={styles.required}>(필수)</span>
            </label>
          </div>
          <Controller
            name='category'
            control={control}
            render={({ field }) => (
              <div
                className={styles.select}
                onClick={() => setIsDropdownOpen((prev) => !prev)}>
                <span>{field.value || '분야별'}</span>
                {isDropdownOpen ? <UpButton /> : <DownButton />}
                {isDropdownOpen && (
                  <div className={styles.dropdownMenu}>
                    {[
                      '광고 · 홍보',
                      '디자인',
                      '레슨',
                      '마케팅',
                      '문서 · 글쓰기',
                    ].map((cat) => (
                      <div
                        key={cat}
                        className={styles.dropdownItem}
                        onClick={() => {
                          field.onChange(cat);
                          setIsDropdownOpen(false);
                        }}>
                        {cat}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <input
          id='fileInput'
          type='file'
          ref={fileInputRef}
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

      <div className={styles.formGroup}>
        <div className={styles.ideaNameWrapper}>
          <Controller
            name='teamName'
            control={control}
            render={({ field }) => (
              <input
                type='text'
                placeholder='팀 주제를 입력하세요. (필수)'
                className={styles.ideaNameInput}
                {...field}
              />
            )}
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <Controller
          name='content'
          control={control}
          render={({ field }) => (
            <ReactQuill
              ref={quillRef}
              value={field.value}
              onChange={field.onChange}
              className={styles.editor}
              theme='snow'
              modules={modules}
              formats={formats}
              placeholder='아이디어 내용을 입력하세요. (필수)'
            />
          )}
        />
      </div>

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
            {watch('pdfFile')?.[0]?.name || '파일이 업로드 되지 않았습니다.'}
          </span>
        </div>
        <input
          ref={pdfInputRef}
          type='file'
          accept='.pdf'
          onChange={handlePdfUpload}
          style={{ display: 'none' }}
        />
      </div>

      <div className={styles.priceQuantityContainer}>
        <div className={styles.priceGroup}>
          <div className={styles.priceLabel}>
            책정 금액
            <span className={styles.required}>(필수)</span>
          </div>
          <Controller
            name='price'
            control={control}
            render={({ field }) => (
              <div className={styles.inputWrapper}>
                <input
                  type='text'
                  className={styles.input}
                  {...field}
                  onChange={(e) => {
                    const value = e.target.value.replace(/[^0-9]/g, '');
                    field.onChange(value);
                  }}
                />
                <span className={styles.unit}>원</span>
              </div>
            )}
          />
        </div>

        <div className={styles.quantityGroup}>
          <div className={styles.quantityLabel}>
            수량 설정
            <span className={styles.required}>(필수)</span>
          </div>
          <div className={styles.inputWrapper}>
            <Controller
              name='quantity'
              control={control}
              render={({ field }) => (
                <>
                  <input
                    type='text'
                    value={field.value}
                    onChange={(e) => {
                      const value = e.target.value.replace(/[^0-9]/g, '');
                      field.onChange(value === '' ? 0 : parseInt(value, 10));
                    }}
                    className={styles.input}
                  />
                  <span className={styles.unit}>개</span>
                  <div className={styles.quantityControlWrapper}>
                    <button
                      type='button'
                      onClick={() => handleQuantityChange(1)}
                      className={styles.quantityButton}>
                      <UpButton />
                    </button>
                    <button
                      type='button'
                      onClick={() => handleQuantityChange(-1)}
                      className={styles.quantityButton}
                      disabled={quantity === 0}>
                      {quantity === 0 ? <DisabledDownButton /> : <DownButton />}
                    </button>
                  </div>
                </>
              )}
            />
          </div>
        </div>
      </div>

      <div className={styles.formGroup}>
        <div className={styles.labelWrapper}>
          <span id='visibilityLabel'>
            공개 여부
            <span className={styles.required}>(필수)</span>
          </span>
        </div>
        <div className={styles.visibilityContainer}>
          <div className={styles.visibilityGroupWrapper}>
            <Controller
              name='visibility'
              control={control}
              render={({ field }) => (
                <div className={styles.visibilityWrapper}>
                  <button
                    type='button'
                    className={`${styles.visibilityButton} ${field.value === '전체공개' ? styles.active : ''}`}
                    onClick={() => field.onChange('전체공개')}>
                    전체공개
                  </button>
                  <button
                    type='button'
                    className={`${styles.visibilityButton} ${field.value === '기업공개' ? styles.active : ''}`}
                    onClick={() => field.onChange('기업공개')}>
                    기업공개
                  </button>
                  <button
                    type='button'
                    className={`${styles.visibilityButton} ${field.value === '비공개' ? styles.active : ''}`}
                    onClick={() => field.onChange('비공개')}>
                    비공개
                  </button>
                </div>
              )}
            />
          </div>

          <div className={styles.portfolioVisibility}>
            <Controller
              name='isPortfolioVisible'
              control={control}
              render={({ field }) => (
                <>
                  <div
                    onClick={() => field.onChange(!field.value)}
                    style={{ cursor: 'pointer' }}>
                    {field.value ? <CheckButton /> : <DisabledCheckButton />}
                    <span
                      className={`${styles.portfolioText} ${field.value ? styles.active : ''}`}>
                      프로필 공개
                    </span>
                  </div>
                  <button
                    type='button'
                    className={styles.editButton}
                    onClick={(e) => {
                      e.stopPropagation();
                      // Edit 버튼 클릭 시 처리할 로직
                    }}>
                    <span>EDIT</span>
                  </button>
                </>
              )}
            />
          </div>
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        <button
          type='button'
          onClick={handleCancel}
          className={styles.cancelButton}>
          취소
        </button>
        <button
          type='submit'
          className={styles.submitButton}>
          <span>등록</span>
        </button>
      </div>
    </form>
  );
};
