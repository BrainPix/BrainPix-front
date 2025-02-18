export const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getPresignedUrl = async (file: File): Promise<string> => {
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
    throw new Error(`Presigned URL 요청 실패 - 상태 코드: ${response.status}`);
  }
  const presignedUrl = await response.text();
  return presignedUrl;
};

export const uploadImageToPresignedUrl = async (
  file: File,
  presignedUrl: string,
): Promise<string> => {
  const response = await fetch(presignedUrl, {
    method: 'PUT',
    body: file,
    headers: { 'Content-Type': file.type },
  });
  if (!response.ok) {
    throw new Error(`이미지 업로드 실패 - 상태 코드: ${response.status}`);
  }
  const imageUrl = presignedUrl.split('?')[0];
  return imageUrl;
};

export type SpecializationType =
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

export type IdeaMarketType = 'IDEA_SOLUTION' | 'MARKET_PLACE';
export type PostAuth = 'ALL' | 'COMPANY' | 'ME';

export interface IdeaMarketPriceDto {
  price: number;
  totalQuantity: number;
}

export interface IdeaMarketRequestData {
  title: string;
  content: string;
  specialization: SpecializationType;
  openMyProfile: boolean;
  postAuth: PostAuth;
  ideaMarketType: IdeaMarketType;
  priceDto: IdeaMarketPriceDto;
  imageList: string[];
  attachmentFileList: string[];
}

export const submitIdeaMarket = async (
  data: IdeaMarketRequestData,
): Promise<Response> => {
  const requestData = {
    title: data.title,
    content: data.content,
    specialization: data.specialization,
    openMyProfile: data.openMyProfile,
    postAuth: data.postAuth,
    ideaMarketType: data.ideaMarketType,
    priceDto: {
      price: data.priceDto.price,
      totalQuantity: data.priceDto.totalQuantity,
    },
    imageList: data.imageList,
    attachmentFileList: data.attachmentFileList,
  };
  const response = await fetch(`${BASE_URL}/idea-markets`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestData),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API 호출 실패: ${errorText}`);
  }
  return response;
};
