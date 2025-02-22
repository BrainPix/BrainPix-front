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

export interface getOtherPostsType {
  postId: number;
  openScope: string;
  specialization: string;
  title: string;
  writerName: string;
  savedCount: number;
  viewCount: number;
  deadline: string;
  thumbnailImage: string;
  writerImageUrl: string;
  price: number;
  currentMembers: number;
  totalMembers: number;
  savedPost: boolean;
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
      acceptedMemberId: number;
    }[];
  }[];
}

export interface CollaborationDetail extends Collaboration {
  applicationStatus: {
    applicantId: string;
    role: string;
    approvedCount: number;
    totalCount: number;
    gatheringId: number;
  }[];
  currentMembers: {
    role: string;
    approvedCount: number;
    memberId: {
      id: string;
      userType: string;
      userId: number;
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

// 게시글 수정 API 요청 데이터 타입
export interface IdeaMarketEditType {
  title: string;
  content: string;
  specialization: string;
  openMyProfile: boolean;
  postAuth: string;
  ideaMarketType: string;
  imageList: string[];
  attachmentFileList: string[];
}
