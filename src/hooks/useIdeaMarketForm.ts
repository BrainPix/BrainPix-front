import { useState, useRef, useEffect, ChangeEvent, MouseEvent } from 'react';
import {
  getPresignedUrl,
  uploadImageToPresignedUrl,
  submitIdeaMarket,
  IdeaMarketRequestData,
  SpecializationType,
  IdeaMarketType,
  PostAuth,
} from '../apis/ideaMarketEditAPI';

export const MAX_FILE_SIZE = 5 * 1024 * 1024;

export const useIdeaMarketForm = () => {
  const [category, setCategory] = useState<string>('');
  const [pageType, setPageType] = useState<'Idea Solution' | 'Market Place'>(
    'Idea Solution',
  );
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [visibility, setVisibility] = useState<
    '전체공개' | '기업공개' | '비공개'
  >('전체공개');
  const [price, setPrice] = useState<string>('0');
  const [quantity, setQuantity] = useState<number>(1);
  const [isPortfolioVisible, setIsPortfolioVisible] = useState(false);
  const [formData, setFormData] = useState<{ title: string; content: string }>({
    title: '',
    content: '',
  });

  const ideaNameInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);

  // 파일 업로드 핸들러
  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImageUrl(imageUrl);
    }
  };

  const handleImageUpload = () => {
    fileInputRef.current?.click();
  };

  const handlePdfUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
    }
  };

  const handlePdfClick = () => {
    pdfInputRef.current?.click();
  };

  // 가격 및 수량 변경 핸들러
  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setPrice(value);
  };

  const handleQuantityChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setQuantity(value === '' ? 0 : parseInt(value, 10));
  };

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () =>
    setQuantity((prev) => (prev > 0 ? prev - 1 : 0));

  // 입력값 변경 핸들러
  const handleIdeaNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, title: e.target.value }));
  };

  const handleContentChange = (content: string) => {
    setFormData((prev) => ({ ...prev, content }));
  };

  // 프로필 공개 토글 및 편집 핸들러
  const togglePortfolioVisibility = () => {
    setIsPortfolioVisible((prev) => !prev);
  };

  const handleEditClick = (e: MouseEvent) => {
    e.stopPropagation();
  };

  // 미리보기 URL cleanup
  useEffect(() => {
    return () => {
      if (previewImageUrl) {
        URL.revokeObjectURL(previewImageUrl);
      }
    };
  }, [previewImageUrl]);

  // 제출 핸들러 (API 호출 포함)
  const handleSubmit = async () => {
    let imageUrl = '';
    if (fileInputRef.current?.files && fileInputRef.current.files.length > 0) {
      const imageFile = fileInputRef.current.files[0];
      const presignedUrl = await getPresignedUrl(imageFile);
      imageUrl = await uploadImageToPresignedUrl(imageFile, presignedUrl);
    }

    // (필요시 category 등 enum 매핑 로직 추가)
    const specialization: SpecializationType = 'DESIGN'; // 예시
    const ideaMarketType: IdeaMarketType =
      pageType === 'Idea Solution' ? 'IDEA_SOLUTION' : 'MARKET_PLACE';
    const postAuth: PostAuth =
      visibility === '전체공개'
        ? 'ALL'
        : visibility === '기업공개'
          ? 'COMPANY'
          : 'ME';

    const requestData: IdeaMarketRequestData = {
      title: ideaNameInputRef.current?.value || '',
      content: formData.content.substring(0, 50000),
      specialization,
      openMyProfile: isPortfolioVisible,
      postAuth,
      ideaMarketType,
      priceDto: {
        price: parseInt(price, 10),
        totalQuantity: quantity,
      },
      imageList: imageUrl ? [imageUrl] : [],
      attachmentFileList: [],
    };

    await submitIdeaMarket(requestData);
    return true;
  };

  return {
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
    setPrice,
    quantity,
    setQuantity,
    isPortfolioVisible,
    formData,
    setFormData,
    ideaNameInputRef,
    fileInputRef,
    pdfInputRef,
    handleFileUpload,
    handleImageUpload,
    handlePdfUpload,
    handlePdfClick,
    handlePriceChange,
    handleQuantityChange,
    handleIncrement,
    handleDecrement,
    handleIdeaNameChange,
    handleContentChange,
    togglePortfolioVisibility,
    handleEditClick,
    handleSubmit,
  };
};
