import React, { useState, useRef, useEffect, useMemo } from 'react';
import ReactQuill from 'react-quill-new';
import { useNavigate } from 'react-router-dom';
import 'react-quill-new/dist/quill.snow.css';
//버튼그룹
import ButtonGroup from '../../components/common/button/ButtonGroup.tsx';

import styles from './collaborationRegister.module.scss';
import MainImage from '../../assets/icons/mainImage.svg?react';
import DownButton from '../../assets/icons/categoryDownButton.svg?react';
import UpButton from '../../assets/icons/categoryUpButton.svg?react';
import DisabledDownButton from '../../assets/icons/disabledDownButton.svg?react';
import CheckButton from '../../assets/icons/checkButton.svg?react';
import DisabledCheckButton from '../../assets/icons/disabledCheckButton.svg?react';

interface CollaborationRegisterProps {
  // Add any props if needed
}

export const CollaborationRegister: React.FC<
  CollaborationRegisterProps
> = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [content, setContent] = useState<string>('');
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [visibility, setVisibility] = useState<
    '전체공개' | '기업공개' | '비공개'
  >('전체공개');
  const [price, setPrice] = useState<string>('0');
  const [quantity, setQuantity] = useState<number>(0);
  const [isPortfolioVisible, setIsPortfolioVisible] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const quillRef = useRef<ReactQuill>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAttachedFile(file);
      const imageUrl = URL.createObjectURL(file);
      setPreviewImageUrl(imageUrl);
    }
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handlePdfUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
    }
  };

  const handlePdfClick = () => {
    pdfInputRef.current?.click();
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setPrice(value);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    const numberValue = value === '' ? 0 : parseInt(value, 10);
    setQuantity(numberValue);
  };

  const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrement = () => {
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0));
  };

  const handlePortfolioVisibility = () => {
    setIsPortfolioVisible((prev) => !prev);
  };

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    navigate('/idea-market/registered');
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
    <div className={styles.container}>
      <div className={styles.title}>팀 빌딩</div>
      <div className={styles.horizontalContainer}>
        <div className={`${styles.formGroup} ${styles.categoryGroup}`}>
          <div className={styles.labelWrapper}>
            <label htmlFor='category'>
              주제 분야 설정
              <span className={styles.required}>(필수)</span>
            </label>
          </div>
          <div
            className={styles.select}
            onClick={() => setIsDropdownOpen((prev) => !prev)}>
            <span>{category || '분야별'}</span>
            {isDropdownOpen ? <UpButton /> : <DownButton />}
            {isDropdownOpen && (
              <div className={styles.dropdownMenu}>
                <div
                  className={styles.dropdownItem}
                  onClick={() => setCategory('광고 · 홍보')}>
                  광고 · 홍보
                </div>
                <div
                  className={styles.dropdownItem}
                  onClick={() => setCategory('디자인')}>
                  디자인
                </div>
                <div
                  className={styles.dropdownItem}
                  onClick={() => setCategory('레슨')}>
                  레슨
                </div>
                <div
                  className={styles.dropdownItem}
                  onClick={() => setCategory('마케팅')}>
                  마케팅
                </div>
                <div
                  className={styles.dropdownItem}
                  onClick={() => setCategory('문서 · 글쓰기')}>
                  문서 · 글쓰기
                </div>
              </div>
            )}
          </div>
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

      <div className={styles.formGroup}>
        <div className={styles.ideaNameWrapper}>
          <input
            type='text'
            placeholder='팀 주제를 입력하세요. (필수)'
            className={styles.ideaNameInput}
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label
          htmlFor='editor'
          className={styles.visuallyHidden}>
          아이디어 내용
        </label>
        <ReactQuill
          ref={quillRef}
          id='editor'
          value={content}
          onChange={setContent}
          className={styles.editor}
          theme='snow'
          modules={modules}
          formats={formats}
          placeholder='아이디어 내용을 입력하세요. (필수)'
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
            {pdfFile ? pdfFile.name : '파일이 업로드 되지 않았습니다.'}
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
          <div className={styles.inputWrapper}>
            <input
              type='text'
              value={price}
              onChange={handlePriceChange}
              className={styles.input}
            />
            <span className={styles.unit}>원</span>
          </div>
        </div>

        <div className={styles.quantityGroup}>
          <div className={styles.quantityLabel}>
            수량 설정
            <span className={styles.required}>(필수)</span>
          </div>
          <div className={styles.inputWrapper}>
            <input
              type='text'
              value={quantity}
              onChange={handleQuantityChange}
              className={styles.input}
            />
            <span className={styles.unit}>개</span>
            <div className={styles.quantityControlWrapper}>
              <button
                onClick={handleIncrement}
                className={styles.quantityButton}>
                <UpButton />
              </button>
              <button
                onClick={handleDecrement}
                className={styles.quantityButton}
                disabled={quantity === 0}>
                {quantity === 0 ? <DisabledDownButton /> : <DownButton />}
              </button>
            </div>
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
            <div className={styles.visibilityWrapper}>
              <button
                className={`${styles.visibilityButton} ${visibility === '전체공개' ? styles.active : ''}`}
                onClick={() => setVisibility('전체공개')}>
                전체공개
              </button>
              <button
                className={`${styles.visibilityButton} ${visibility === '기업공개' ? styles.active : ''}`}
                onClick={() => setVisibility('기업공개')}>
                기업공개
              </button>
              <button
                className={`${styles.visibilityButton} ${visibility === '비공개' ? styles.active : ''}`}
                onClick={() => setVisibility('비공개')}>
                비공개
              </button>
            </div>
          </div>

          <div
            className={styles.portfolioVisibility}
            onClick={handlePortfolioVisibility}>
            {isPortfolioVisible ? <CheckButton /> : <DisabledCheckButton />}
            <span
              className={`${styles.portfolioText} ${isPortfolioVisible ? styles.active : ''}`}>
              프로필 공개
            </span>
            <button
              className={styles.editButton}
              onClick={handleEditClick}>
              <span>EDIT</span>
            </button>
          </div>
        </div>
      </div>

      <div className={styles.buttonWrapper}>
        <button
          onClick={handleCancel}
          className={styles.cancelButton}>
          취소
        </button>
        <button
          onClick={handleSubmit}
          className={styles.submitButton}>
          <span>등록</span>
        </button>
      </div>
    </div>
  );
};
