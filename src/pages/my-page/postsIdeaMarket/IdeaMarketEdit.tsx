import React, { useMemo, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import { useParams, useNavigate } from 'react-router-dom';
import 'react-quill-new/dist/quill.snow.css';
import styles from '../../idea-market/ideaMarketRegister.module.scss';

import { Dropdown } from '../../../components/common/dropdown/Dropdown';
import { ImageUploader } from '../../../components/my-page/edit/ImageUploader';
import { FileUploader } from '../../../components/my-page/edit/FileUploader';
import { IdeaName } from '../../../components/my-page/edit/IdeaName';
import { PageSelect } from '../../../components/my-page/edit/PageSelect';
import { PriceAndQuantity } from '../../../components/my-page/edit/PriceAndQuantity';
import { VisibilityControl } from '../../../components/my-page/edit/VisibilityControl';
import { ContentEditor } from '../../../components/my-page/edit/ContentEditor';

import { useIdeaMarketForm } from '../../../hooks/useIdeaMarketForm';

import { useQuery, useMutation } from '@tanstack/react-query';
import {
  getPostIdeaMarketDetail,
  putPostIdeaMarket,
} from '../../../apis/postManagementAPI';
import { IdeaMarketEditType } from '../../../types/postDataType';
import { IdeaMarketDetail } from '../../../types/postDataType';

export const IdeaMarketEdit = () => {
  const navigate = useNavigate();
  const { ideaId } = useParams<{ ideaId: string }>();

  const {
    category,
    setCategory,
    pageType,
    setPageType,
    showDetail,
    setShowDetail,
    previewImageUrl,
    pdfFile,
    visibility,
    setVisibility,
    price,
    handlePriceChange,
    quantity,
    handleQuantityChange,
    handleIncrement,
    handleDecrement,
    isPortfolioVisible,
    togglePortfolioVisibility,
    handleEditClick,
    formData,
    setFormData,
    ideaNameInputRef,
    //fileInputRef,
    pdfInputRef,
    handleFileUpload,
    handleImageUpload,
    handlePdfUpload,
    handlePdfClick,
    handleContentChange,
    handleSubmit,
  } = useIdeaMarketForm();

  const quillRef = useMemo(() => React.createRef<ReactQuill>(), []);
  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          [{ font: [] }, { size: [] }, { align: [] }],
          ['link', 'image'],
        ],
        handlers: {
          // 필요시 image 핸들러 추가
          image: () => {
            const input = document.createElement('input');
            input.setAttribute('type', 'file');
            input.setAttribute('accept', 'image/*');
            input.click();
            input.onchange = async () => {
              const file = input.files?.[0];
              if (file) {
                // 파일 사이즈 검사 등의 로직
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
    };
  }, [quillRef]);

  const formats = ['font', 'size', 'align', 'link', 'image'];

  const {
    data: postData,
    isLoading,
    isError,
    isSuccess,
  } = useQuery<IdeaMarketDetail, Error>({
    queryKey: ['ideaMarketDetail', ideaId],
    queryFn: () => getPostIdeaMarketDetail(Number(ideaId)),
    enabled: !!ideaId,
  });

  useEffect(() => {
    if (isSuccess && postData) {
      // 예: 가져온 데이터를 폼에 세팅
      setFormData((prev) => ({
        ...prev,
        title: postData.title,
        // content가 있다면 postData.content 등으로 넣기
        //content: postData.content ?? '',
      }));
      // 필요하다면 category, visibility, pageType 등도 postData로부터 세팅
      // setCategory(postData.specialization ?? '');
    }
  }, [isSuccess, postData, setFormData]);

  // 2) 수정 Mutation
  const mutation = useMutation({
    mutationFn: (payload: IdeaMarketEditType) =>
      putPostIdeaMarket(Number(ideaId), payload),
    onSuccess: () => {
      alert('게시글 수정 성공!');
      navigate(-1);
    },
    onError: (error) => {
      console.log('게시글 수정 실패:', error);
      alert('수정에 실패했습니다.');
    },
  });

  // 3) 수정하기 버튼 핸들러
  const handleUpdate = () => {
    if (!ideaId) return;
    // 서버 PUT API에 맞춰서 Request Body를 구성(IdeaMarketEditType)
    const updatePayload: IdeaMarketEditType = {
      title: formData.title,
      content: formData.content,
      specialization: 'DESIGN', // 또는 category -> 서버 enum 매핑
      openMyProfile: isPortfolioVisible,
      postAuth:
        visibility === '전체공개'
          ? 'ALL'
          : visibility === '기업공개'
            ? 'COMPANY'
            : 'ME',
      ideaMarketType:
        pageType === 'Idea Solution' ? 'IDEA_SOLUTION' : 'MARKET_PLACE',
      imageList: [], // 필요시 미리 업로드한 이미지 URLs
      attachmentFileList: [], // PDF 등 첨부 파일 URLs
    };

    // Mutation 호출
    mutation.mutate(updatePayload);
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !postData) return <div>게시글을 불러올 수 없습니다.</div>;

  return (
    <div className={styles.container}>
      <div className={styles.title}>아이디어 수정하기</div>

      {/* (예시) Dropdown/Category 분리 시 */}
      <div className={styles.horizontalContainer}>
        {/* 카테고리 선택 (Dropdown 컴포넌트 예시) */}
        <Dropdown
          label='카테고리 (필수)'
          defaultValue={category || '분야별'}
          onSelect={setCategory}
          // 필요시 options 전달
        />

        {/* 페이지 타입 선택 */}
        <PageSelect
          pageType={pageType}
          setPageType={setPageType}
          showDetail={showDetail}
          setShowDetail={setShowDetail}
        />
      </div>

      <ImageUploader
        previewImageUrl={previewImageUrl}
        handleFileUpload={handleFileUpload}
        handleImageUpload={handleImageUpload}
      />

      <IdeaName
        ref={ideaNameInputRef}
        value={formData.title}
        onChange={(e) => {
          setFormData((prev) => ({ ...prev, title: e.target.value }));
        }}
      />

      <ContentEditor
        value={formData.content}
        onChange={handleContentChange}
        quillRef={quillRef}
        modules={modules}
        formats={formats}
      />

      <FileUploader
        pdfFile={pdfFile}
        handlePdfUpload={handlePdfUpload}
        handlePdfClick={handlePdfClick}
        pdfInputRef={pdfInputRef}
      />

      <PriceAndQuantity
        price={price}
        onPriceChange={handlePriceChange}
        quantity={quantity}
        onQuantityChange={handleQuantityChange}
        handleIncrement={handleIncrement}
        handleDecrement={handleDecrement}
        pageType={pageType}
      />

      <VisibilityControl
        visibility={visibility}
        setVisibility={setVisibility}
        isPortfolioVisible={isPortfolioVisible}
        togglePortfolioVisibility={togglePortfolioVisibility}
        handleEditClick={handleEditClick}
      />

      <div className={styles.buttonWrapper}>
        <button
          onClick={() => navigate(-1)}
          className={styles.cancelButton}>
          취소
        </button>

        {ideaId ? (
          /* 수정하기 버튼 */
          <button
            onClick={handleUpdate}
            className={styles.submitButton}>
            <span>수정</span>
          </button>
        ) : (
          /* 등록하기 버튼 */
          <button
            onClick={async () => {
              try {
                await handleSubmit();
                navigate('/idea-market/register-complete');
              } catch (error) {
                console.log('게시글 등록 에러 발생', error);
                alert('등록에 실패했습니다. 다시 시도해주세요.');
              }
            }}
            className={styles.submitButton}>
            <span>등록</span>
          </button>
        )}
      </div>
    </div>
  );
};
