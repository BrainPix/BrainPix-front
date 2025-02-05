export interface LoginPayload {
  id: string;
  password: string;
}

export interface CommonSignUpPayload {
  id: string;
  password: string;
  name: string;
  birthday: string;
  email: string;
}

export interface PersonalSignUpPayload extends CommonSignUpPayload {
  nickName: string;
}

export interface CompanySignUpPayload extends CommonSignUpPayload {
  companyName: string;
  position: string;
}

export interface ResponseType {
  success: boolean;
  code: string;
  message: string;
  data: object;
}

export interface IdeaMarketDetail {
  ideaId: number;
  thumbnailImageUrl: string;
  category: string;
  ideaMarketType: string;
  auth: string;
  title: string;
  content: string;
  price: number;
  viewCount: number;
  saveCount: number;
  totalQuantity: number;
  occupiedQuantity: number;
  createdDate: string;
  writer: {
    writerId: number;
    name: string;
    profileImageUrl: string;
    role: string;
    specialization: string;
    totalIdeas: number;
    totalCollaborations: number;
  };
  attachments: string[];
}
