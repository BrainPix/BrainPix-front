import React, { useState, useRef, useEffect, useMemo } from 'react';
import ReactQuill from 'react-quill-new';
import { useNavigate } from 'react-router-dom';
import 'react-quill-new/dist/quill.snow.css';
import styles from './requestAssignRegister.module.scss';
import MainImage from '../../assets/icons/mainImage.svg?react';
import DownButton from '../../assets/icons/categoryDownButton.svg?react';
import UpButton from '../../assets/icons/categoryUpButton.svg?react';
import DisabledDownButton from '../../assets/icons/disabledDownButton.svg?react';
import CheckButton from '../../assets/icons/checkButton.svg?react';
import DisabledCheckButton from '../../assets/icons/disabledCheckButton.svg?react';
import InfoDropdown from '../../assets/icons/infoDropdown.svg?react';
import { Image } from '../../components/common/image/Image';

interface RequestAssignRegisterProps {
  [key: string]: never;
}

export const RequestAssignRegisterNow: React.FC<
  RequestAssignRegisterProps
> = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [pageType, setPageType] = useState<'Open Idea' | 'Tech Zone'>(
    'Open Idea',
  );
  const [showDetail, setShowDetail] = useState(false);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [content, setContent] = useState<string>('');
  const [, setAttachedFile] = useState<File | null>(null);
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
      // 이미지 URL 생성
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

  const OPTIONS = [
    '광고 · 홍보',
    '디자인',
    '레슨',
    '마케팅',
    '문서 · 글쓰기',
    '미디어 · 콘텐츠',
    '번역 및 통역',
    '세무 · 법무 · 노무',
    '주문제작',
    '창업 · 사업',
    '푸드 및 음료',
    'IT · 테크',
    '기타',
  ];

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
    e.stopPropagation(); // 상위 컴포넌트로의 이벤트 전파 방지
    // Edit 버튼 클릭 시 처리할 로직
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSubmit = () => {
    navigate('/request-assign/register-complete');
  };

  useEffect(() => {
    return () => {
      // 컴포넌트가 언마운트될 때 URL 정리
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

  // Quill 에디터 스타일 설정
  const formats = ['font', 'size', 'align', 'link', 'image'];

  return (
    <div className={styles.container}>
      <div className={styles.title}>요청 과제 등록하기</div>
      <div className={styles.horizontalContainer}>
        <div className={`${styles.formGroup} ${styles.categoryGroup}`}>
          <div className={styles.labelWrapper}>
            <label htmlFor='category'>
              카테고리
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
                {OPTIONS.map((option) => (
                  <div
                    key={option}
                    className={styles.dropdownItem}
                    onClick={() => setCategory(option)}>
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className={`${styles.formGroup} ${styles.pageTypeGroup}`}>
          <div className={styles.labelWrapper}>
            <span id='pageTypeLabel'>
              페이지 설정
              <span className={styles.required}>(필수)</span>
            </span>
          </div>
          <div
            className={styles.pageTypeWrapper}
            role='group'
            aria-labelledby='pageTypeLabel'>
            <button
              className={`${styles.pageTypeButton} ${pageType === 'Open Idea' ? styles.active : ''}`}
              onClick={() => setPageType('Open Idea')}>
              Open Idea
            </button>
            <button
              className={`${styles.pageTypeButton} ${pageType === 'Tech Zone' ? styles.active : ''}`}
              onClick={() => setPageType('Tech Zone')}>
              Tech Zone
            </button>
          </div>

          {pageType === 'Open Idea' && (
            <div
              className={`${styles.pageDescription} ${showDetail ? styles.detail : ''}`}
              onClick={() => setShowDetail(!showDetail)}>
              <div className={styles.header}>
                <span className={styles.descriptionText}>Open Idea란?</span>
                <InfoDropdown
                  className={styles.infoIcon}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDetail(!showDetail);
                  }}
                />
              </div>
              {showDetail && (
                <div className={styles.detailDescription}>
                  <span className={styles.mainText}>
                    누구나 참여할 수 있는 창의적인 아이디어 과제
                  </span>
                  <span className={styles.subText}>
                    {`ex) '새로운 카페 브랜드를 위한 세련되고 기억에 남는 이름을 제안해주세요.'
                    '환경 보호를 주제로 한 캠페인을 위한 슬로건을 만들어주세요.'`}
                  </span>
                </div>
              )}
            </div>
          )}

          {pageType === 'Tech Zone' && (
            <div
              className={`${styles.pageDescription} ${showDetail ? styles.detail : ''}`}
              onClick={() => setShowDetail(!showDetail)}>
              <div className={styles.header}>
                <span className={styles.descriptionText}>Tech Zone이란?</span>
                <InfoDropdown
                  className={styles.infoIcon}
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDetail(!showDetail);
                  }}
                />
              </div>
              {showDetail && (
                <div className={styles.detailDescription}>
                  <span className={styles.mainText}>
                    전문 지식이 필요한 기술 중심 프로젝트
                  </span>
                  <span className={styles.subText}>
                    {` ex) '판매 데이터를 분석하여 다음 분기의 매출 예측 모델을 개발해주세요.'
                    '간단한 이커머스 웹사이트를 구축하고 결제 시스템을 연동해주세요.'`}
                  </span>
                </div>
              )}
            </div>
          )}
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
          <input
            type='text'
            placeholder='과제명이에용..'
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

        {pageType === 'Tech Zone' && (
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
        )}
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
