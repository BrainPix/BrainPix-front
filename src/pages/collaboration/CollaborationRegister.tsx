import React, { useState, useRef, useEffect, useMemo } from 'react';
import ReactQuill from 'react-quill-new';
import { useNavigate } from 'react-router-dom';
import 'react-quill-new/dist/quill.snow.css';
import styles from './collaborationRegister.module.scss';
import MainImage from '../../assets/icons/mainImage.svg?react';
import DownButton from '../../assets/icons/categoryDownButton.svg?react';
import UpButton from '../../assets/icons/categoryUpButton.svg?react';
import CheckButton from '../../assets/icons/checkButton.svg?react';
import DisabledCheckButton from '../../assets/icons/disabledCheckButton.svg?react';

interface CollaborationRequestData {
  title: string;
  content: string;
  specialization: SpecializationType;
  openMyProfile: boolean;
  imageList: string[];
  attachmentFileList: string[];
  postAuth: PostAuth;
  deadline: string;
  link: string;
  recruitments: CollaborationRecruitmentDto[];
  initialMembers: CollaborationHubInitialMemberDto[];
}

type SpecializationType =
  | 'ADVERTISING_PROMOTION'
  | 'DESIGN'
  | 'LESSON'
  | 'MARKETING'
  | 'DOCUMENT_WRITING'
  | 'MEDIA_CONTENT'
  | 'TRANSLATION_INTERPRETATION'
  | 'TAX_LAW_LABOR'
  | 'CUSTOM_PRODUCTION'
  | 'STARTUP_BUSINESS'
  | 'FOOD_BEVERAGE'
  | 'IT_TECH'
  | 'OTHERS';

type PostAuth = 'ALL' | 'COMPANY' | 'ME';

interface CollaborationRecruitmentDto {
  domain: string;
  gatheringDto: GatheringDto;
}

interface GatheringDto {
  totalQuantity: number;
}

interface CollaborationHubInitialMemberDto {
  domain: string;
  identifier: string;
}

const categoryToEnum: Record<string, SpecializationType> = {
  '광고 · 홍보': 'ADVERTISING_PROMOTION',
  디자인: 'DESIGN',
  레슨: 'LESSON',
  마케팅: 'MARKETING',
  '문서 · 글쓰기': 'DOCUMENT_WRITING',
  '미디어 · 콘텐츠': 'MEDIA_CONTENT',
  '번역 및 통역': 'TRANSLATION_INTERPRETATION',
  '세무 · 법무 · 노무': 'TAX_LAW_LABOR',
  주문제작: 'CUSTOM_PRODUCTION',
  '창업 · 사업': 'STARTUP_BUSINESS',
  '푸드 및 음료': 'FOOD_BEVERAGE',
  'IT · 테크': 'IT_TECH',
  기타: 'OTHERS',
};

const visibilityToEnum: Record<string, PostAuth> = {
  전체공개: 'ALL',
  기업공개: 'COMPANY',
  비공개: 'ME',
};

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const BASE_URL = import.meta.env.VITE_BASE_URL;

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

interface RecruitmentField {
  id: number;
  field: string;
  numberOfPeople: number;
}

interface CollaborationRequestDataProps {
  [key: string]: never;
}

export const CollaborationRegister: React.FC<
  CollaborationRequestDataProps
> = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [content, setContent] = useState<string>('');
  const [, setAttachedFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [visibility, setVisibility] = useState<
    '전체공개' | '기업공개' | '비공개'
  >('전체공개');
  const [link, setLink] = useState('');
  const [isPortfolioVisible, setIsPortfolioVisible] = useState(false);

  const [recruitmentFields, setRecruitmentFields] = useState<
    CollaborationRecruitmentDto[]
  >([{ domain: '', gatheringDto: { totalQuantity: 1 } }]);

  const [initialMembers, setInitialMembers] = useState<
    CollaborationHubInitialMemberDto[]
  >([{ domain: '', identifier: '' }]);

  const [recruitmentDeadline, setRecruitmentDeadline] = useState({
    year: '',
    month: '',
    day: '',
  });

  const ideaNameInputRef = useRef<HTMLInputElement>(null);
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

  const handleAddField = () => {
    setRecruitmentFields((prev) => [
      ...prev,
      { id: prev.length + 1, field: '', numberOfPeople: 0 },
    ]);
  };

  const handleFieldChange = (id: number, field: string) => {
    setRecruitmentFields((prev) =>
      prev.map((item) => (item.id === id ? { ...item, field } : item)),
    );
  };

  const handleLinkSubmit = (submittedLink: string) => {
    setLink(submittedLink);
  };

  const handleNumberChange = (id: number, numberOfPeople: number) => {
    setRecruitmentFields((prev) =>
      prev.map((item) => (item.id === id ? { ...item, numberOfPeople } : item)),
    );
  };

  const handleLoadProfile = async (id: number) => {
    try {
      console.log(`Loading profile for ID: ${id}`);
    } catch (error) {
      console.error('프로필 불러오기 실패:', error);
      alert('프로필을 불러오는데 실패했습니다.');
    }
  };

  const handlePdfClick = () => {
    pdfInputRef.current?.click();
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

  const getPresignedUrl = async (file: File): Promise<string> => {
    try {
      const fileName = encodeURIComponent(file.name);
      const contentType = encodeURIComponent(file.type);

      const response = await fetch(
        `${BASE_URL}/files/presigned-url?fileName=${fileName}&contentType=${contentType}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(
          `Presigned URL 요청 실패 - 상태 코드: ${response.status}`,
        );
      }

      const presignedUrl = await response.text();
      return presignedUrl;
    } catch (error) {
      console.error('❌ Presigned URL 요청 에러:', error);
      throw error;
    }
  };

  const uploadImageToPresignedUrl = async (
    file: File,
    presignedUrl: string,
  ): Promise<string> => {
    try {
      const response = await fetch(presignedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': file.type,
        },
      });

      if (!response.ok) {
        throw new Error(
          `이미지 Presigned URL 업로드 실패 - 상태 코드: ${response.status}`,
        );
      }

      const imageUrl = presignedUrl.split('?')[0];
      console.log('✅ Presigned URL 업로드 성공, 저장된 이미지 URL:', imageUrl);
      return imageUrl;
    } catch (error) {
      console.error('❌ 이미지 업로드 에러:', error);
      throw error;
    }
  };

  const uploadPdfToPresignedUrl = async (
    file: File,
    presignedUrl: string,
  ): Promise<string> => {
    try {
      const response = await fetch(presignedUrl, {
        method: 'PUT',
        body: file,
        headers: {
          'Content-Type': 'application/pdf',
        },
      });

      if (!response.ok) {
        throw new Error(`PDF 업로드 실패`);
      }

      return presignedUrl.split('?')[0];
    } catch (error) {
      console.error('PDF 업로드 에러:', error);
      throw error;
    }
  };

  const handleSubmit = async () => {
    try {
      let imageUrl = '';
      let pdfUrl = '';

      const currentFileInput = fileInputRef.current;
      if (currentFileInput?.files && currentFileInput.files.length > 0) {
        const imageFile = currentFileInput.files[0];
        const presignedUrl = await getPresignedUrl(imageFile);
        imageUrl = await uploadImageToPresignedUrl(imageFile, presignedUrl);
      }

      if (pdfFile) {
        const pdfPresignedUrl = await getPresignedUrl(pdfFile);
        pdfUrl = await uploadPdfToPresignedUrl(pdfFile, pdfPresignedUrl);
      }

      const deadlineString = `${recruitmentDeadline.year}-${recruitmentDeadline.month.padStart(2, '0')}-${recruitmentDeadline.day.padStart(2, '0')} 14:30`;

      const plainContent = content.replace(/<[^>]*>/g, '');

      const requestData: RequestAssignRequestData = {
        title: ideaNameInputRef.current?.value || '',
        link: link,
        content: plainContent,
        specialization: categoryToEnum[category],
        openMyProfile: isPortfolioVisible,
        imageList: imageUrl ? [imageUrl] : [],
        attachmentFileList: pdfUrl ? [pdfUrl] : [],
        postAuth: visibilityToEnum[visibility],
        recruitments: recruitmentFields.map((field) => ({
          domain: field.field || '기본 분야',
          requestTaskPriceDto: {
            price:
              field.numberOfPeople > 0 ? field.numberOfPeople * 1000 : 1000,
            totalQuantity: field.numberOfPeople || 1,
            paymentDuration: 'ONCE',
          },
        })),
        deadline: deadlineString,
        requestTaskType:
          RequestTaskTypeEnumMap[
            pageType === 'OPEN_IDEA' ? 'OPEN_IDEA' : 'TECH_ZONE'
          ],
      };

      console.log('요청 데이터:', JSON.stringify(requestData, null, 2));

      const response = await submitRequestAssign(requestData);
      navigate(`/request-assign/register-complete?ideaId=${response.id}`);
    } catch (error) {
      console.error('제출 중 에러:', error);
      alert('등록에 실패했습니다. 다시 시도해주세요.');
    }
  };

  const submitRequestAssign = async (
    data: RequestAssignRequestData,
  ): Promise<{ id: number }> => {
    try {
      const requestData = {
        title: data.title,
        content: data.content,
        specialization: data.specialization,
        openMyProfile: data.openMyProfile,
        imageList: data.imageList,
        attachmentFileList: data.attachmentFileList,
        postAuth: data.postAuth,
        recruitments: data.recruitments.map((recruitment) => ({
          domain: recruitment.domain,
          requestTaskPriceDto: {
            price: recruitment.requestTaskPriceDto.price,
            totalQuantity: recruitment.requestTaskPriceDto.totalQuantity,
            paymentDuration: recruitment.requestTaskPriceDto.paymentDuration,
          },
        })),
        deadline: data.deadline,
        requestTaskType: data.requestTaskType,
      };

      const response = await fetch(`${BASE_URL}/request-tasks`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });

      if (!response.ok) {
        throw new Error(`API 호출 실패`);
      }

      const responseData = await response.json();
      return responseData;
    } catch (error) {
      console.error('Request Error Details:', {
        error,
      });
      throw error;
    }
  };

  useEffect(() => {
    console.log('Current previewImageUrl:', previewImageUrl);
    return () => {
      if (previewImageUrl) {
        console.log('Cleaning up URL:', previewImageUrl);
        URL.revokeObjectURL(previewImageUrl);
      }
    };
  }, [previewImageUrl]);

  const modules = useMemo(() => {
    console.log('Initializing Quill modules');
    return {
      toolbar: {
        container: [
          [{ font: [] }, { size: [] }, { align: [] }],
          ['link', 'image'],
        ],
        handlers: {
          image: () => {
            console.log('Image handler triggered');
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.click();

            input.onchange = async () => {
              const file = input.files?.[0];
              if (file) {
                console.log('Selected file:', {
                  name: file.name,
                  size: file.size,
                  type: file.type,
                });

                if (file.size > MAX_FILE_SIZE) {
                  console.warn('File size exceeds limit:', file.size);
                  alert('이미지 파일 크기는 5MB를 초과할 수 없습니다.');
                  return;
                }

                const reader = new FileReader();
                reader.onload = () => {
                  console.log('File read completed');
                  const quill = quillRef.current?.getEditor();
                  if (quill) {
                    const range = quill.getSelection(true);
                    console.log('Quill selection range:', range);
                    quill.insertEmbed(range.index, 'image', reader.result);
                    console.log('Image embedded in editor');
                  } else {
                    console.warn('Quill editor not found');
                  }
                };
                reader.onerror = (error) => {
                  console.error('FileReader error:', error);
                };
                reader.readAsDataURL(file);
              }
            };
          },
        },
      },
    };
  }, []);

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
            ref={ideaNameInputRef}
            type='text'
            placeholder='팀 주제를 입력하세요. (필수)'
            className={styles.ideaNameInput}
          />
        </div>
      </div>

      <div className={styles.fileUploadGroup}>
        <div className={styles.fileUploadLabel}>
          <span className={styles.labelText}>링크 첨부</span>
        </div>
        <div className={styles.fileUploadBox}>
          <input
            type='text'
            placeholder='과제 링크를 임베드 하세요.'
            value={link}
            onChange={(e) => setLink(e.target.value)}
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

      <div className={styles.formGroup}>
        <div className={styles.labelWrapper}>
          모집 분야 및 인원 설정
          <span className={styles.required}>(필수)</span>
        </div>
        {recruitmentFields.map((field) => (
          <div
            key={field.id}
            className={styles.ideaNameWrapper}>
            <input
              type='text'
              placeholder='역할 (텍스트)'
              value={field.field}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className={styles.recruitmentFieldInput}
            />
            <input
              type='text'
              value={field.numberOfPeople || ''}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                handleNumberChange(field.id, parseInt(value) || 0);
              }}
              placeholder='모집 인원'
              className={styles.recruitmentFieldInput}
            />
            <span
              className={styles.deleteText}
              onClick={() => {
                setRecruitmentFields((prev) =>
                  prev.filter((item) => item.id !== field.id),
                );
              }}>
              삭제
            </span>
          </div>
        ))}
        <div className={styles.recruitmentFieldButtons}>
          <button
            onClick={handleAddField}
            className={styles.addButton}>
            <span>추가하기</span>
          </button>
        </div>
      </div>

      <div className={styles.formGroup}>
        <div className={styles.labelWrapper}>
          프로젝트 개최 인원 정보
          <span className={styles.required}>(필수)</span>
        </div>
        {recruitmentFields.map((field) => (
          <div
            key={field.id}
            className={styles.projectMemberWrapper}>
            <input
              type='text'
              placeholder='아이디'
              value={field.id}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className={styles.recruitmentFieldInput}
            />
            <input
              type='text'
              placeholder='역할 (텍스트)'
              value={field.field}
              onChange={(e) => handleFieldChange(field.id, e.target.value)}
              className={styles.recruitmentFieldInput}
            />
            <button
              type='button'
              onClick={() => handleLoadProfile(field.id)}
              className={styles.profileLoadButton}>
              프로필 불러오기
            </button>
            <span
              className={styles.deleteText}
              onClick={() => {
                setRecruitmentFields((prev) =>
                  prev.filter((item) => item.id !== field.id),
                );
              }}>
              삭제
            </span>
          </div>
        ))}
        <div className={styles.recruitmentFieldButtons}>
          <button
            onClick={handleAddField}
            className={styles.addButton}>
            <span>추가하기</span>
          </button>
        </div>
      </div>

      <div className={styles.formGroup}>
        <div className={styles.labelWrapper}>
          모집 기한 설정 <span className={styles.required}>(필수)</span>
          <span className={styles.helperText}>*마감 일자를 입력해주세요</span>
        </div>
        <div className={styles.recruitmentDateContainer}>
          <div className={styles.recruitmentDateWrapper}>
            <input
              type='text'
              value={recruitmentDeadline.year}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                setRecruitmentDeadline((prev) => ({ ...prev, year: value }));
              }}
              className={styles.recruitmentDateInput}
              placeholder='YYYY'
              maxLength={4}
            />
          </div>
          <span className={styles.recruitmentDateLabel}>년</span>

          <div className={styles.recruitmentDateWrapper}>
            <input
              type='text'
              value={recruitmentDeadline.month}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                setRecruitmentDeadline((prev) => ({ ...prev, month: value }));
              }}
              className={styles.recruitmentDateInput}
              placeholder='MM'
              maxLength={2}
            />
          </div>
          <span className={styles.recruitmentDateLabel}>월</span>

          <div className={styles.recruitmentDateWrapper}>
            <input
              type='text'
              value={recruitmentDeadline.day}
              onChange={(e) => {
                const value = e.target.value.replace(/[^0-9]/g, '');
                setRecruitmentDeadline((prev) => ({ ...prev, day: value }));
              }}
              className={styles.recruitmentDateInput}
              placeholder='DD'
              maxLength={2}
            />
          </div>
          <span className={styles.recruitmentDateLabel}>일</span>
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
