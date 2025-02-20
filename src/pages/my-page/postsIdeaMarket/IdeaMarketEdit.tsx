import React, { useMemo, useEffect } from 'react';
import ReactQuill from 'react-quill-new';
import { useParams } from 'react-router-dom';
import 'react-quill-new/dist/quill.snow.css';
import styles from './ideaMarketEdit.module.scss';

import { Dropdown } from '../../../components/common/dropdown/Dropdown';
import { ImageUploader } from '../../../components/my-page/edit/ImageUploader';
import { FileUploader } from '../../../components/my-page/edit/FileUploader';
import { IdeaName } from '../../../components/my-page/edit/IdeaName';
import { PageSelect } from '../../../components/my-page/edit/PageSelect';
import { PriceAndQuantity } from '../../../components/my-page/edit/PriceAndQuantity';
import { VisibilityControl } from '../../../components/my-page/edit/VisibilityControl';
import { ContentEditor } from '../../../components/my-page/edit/ContentEditor';
import { ButtonGroup } from '../../../components/my-page/edit/ButtonGroup';

import { useIdeaMarketForm } from '../../../hooks/useIdeaMarketForm';

import { useQuery } from '@tanstack/react-query';
import { getPostIdeaMarketDetail } from '../../../apis/postManagementAPI';
import { IdeaMarketDetail } from '../../../types/postDataType';
import LoadingPage from '../../loading/LoadingPage';
import { ErrorPage } from '../../errorPage/ErrorPage';

export const IdeaMarketEdit = () => {
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

  if (isLoading) return <LoadingPage />;
  if (isError || !postData) return <ErrorPage />;

  return (
    <div className={styles.container}>
      <div className={styles.title}>아이디어 수정하기</div>
      <div className={styles.horizontalContainer}>
        <div className={styles.formGroup}>
          <Dropdown
            label='카테고리 (필수)'
            defaultValue={category || '분야별'}
            onSelect={setCategory}
          />
        </div>

        <div className={styles.formGroup}>
          <PageSelect
            pageType={pageType}
            setPageType={setPageType}
            showDetail={showDetail}
            setShowDetail={setShowDetail}
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <ImageUploader
          previewImageUrl={previewImageUrl}
          handleFileUpload={handleFileUpload}
          handleImageUpload={handleImageUpload}
        />
      </div>

      <div className={styles.formGroup}>
        <IdeaName
          ref={ideaNameInputRef}
          value={formData.title}
          onChange={(e) => {
            setFormData((prev) => ({ ...prev, title: e.target.value }));
          }}
        />
      </div>

      <div className={styles.formGroup}>
        <ContentEditor
          value={formData.content}
          onChange={handleContentChange}
          quillRef={quillRef}
          modules={modules}
          formats={formats}
        />
      </div>

      <div className={styles.formGroup}>
        <FileUploader
          pdfFile={pdfFile}
          handlePdfUpload={handlePdfUpload}
          handlePdfClick={handlePdfClick}
          pdfInputRef={pdfInputRef}
        />
      </div>

      <div className={styles.formGroup}>
        <PriceAndQuantity
          price={price}
          onPriceChange={handlePriceChange}
          quantity={quantity}
          onQuantityChange={handleQuantityChange}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
          pageType={pageType}
        />
      </div>

      <div className={styles.formGroup}>
        <VisibilityControl
          visibility={visibility}
          setVisibility={setVisibility}
          isPortfolioVisible={isPortfolioVisible}
          togglePortfolioVisibility={togglePortfolioVisibility}
          handleEditClick={handleEditClick}
        />
      </div>

      <div className={styles.formGroup}>
        <ButtonGroup
          ideaId={ideaId}
          handleSubmit={handleSubmit}
          formData={formData}
          isPortfolioVisible={isPortfolioVisible}
          visibility={visibility}
          pageType={pageType}
        />
      </div>
    </div>
  );
};
