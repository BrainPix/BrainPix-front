export interface IdeaMarket {
  ideaId: number;
  auth: string;
  writerImageUrl: string;
  writerName: string;
  specialization: string;
  title: string;
  thumbnailImageUrl: string | null;
  price: number;
  saveCount?: number;
  viewCount?: number;
}

export interface RequestTask {
  ideaId: number;
  auth: string;
  writerImageUrl: string;
  writerName: string;
  specialization: string;
  title: string;
  thumbnailImageUrl: string | null;
  deadLine?: string;
  saveCount?: number;
  viewCount?: number;
}

export interface Collaboration {
  ideaId: number;
  auth: string;
  writerImageUrl: string;
  writerName: string;
  thumbnailImageUrl: string | null;
  title: string;
  deadLine?: string;
  specialization: string;
  saveCount?: number;
  viewCount?: number;
  totalQuantity?: number;
  occupiedQuantity?: number;
}

// 상세 조회 API 응답 데이터 타입
export interface IdeaMarketDetail extends IdeaMarket {
  purchaseHistory: {
    buyerID: string;
    userId: number;
    payment: string;
    totalPay: number;
  }[];
}

export interface RequestTaskDetail extends RequestTask {
  applicationStatus: {
    applicantId: string;
    role: string;
    approvedCount: number;
    totalCount: number;
    purchasingId: number;
  }[];
  currentMembers: {
    role: string;
    approvedCount: number;
    memberId: {
      id: string;
      userType: string;
    }[];
  }[];
}

export interface PostApiResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
  size: number;
  hasNext: boolean;
}
