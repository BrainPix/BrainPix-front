export interface CollaborationCheck {
  success: true;
  code: string;
  message: string;
  data: {
    content: [
      {
        collaborationId: number;
        auth: 'ALL' | 'COMPANY' | 'ME';
        writerImageUrl: string;
        writerName: string;
        thumbnailImageUrl: string;
        title: string;
        deadline: number;
        category: string;
        occupiedQuantity: number;
        totalQuantity: number;
        saveCount: number;
        viewCount: number;
        isSavedPost: boolean;
      },
    ];
    totalPages: number;
    totalElements: number;
    currentPage: number;
    size: number;
    hasNext: boolean;
  };
}

export interface GetCollaborationListRequest {
  page?: number;
  size?: number;
  category?: string;
  keyword?: string;
  onlyCompany?: boolean;
  sortType?: string;
}

export interface SearchParams {
  page?: number;
  size?: number;
}

export interface BookmarkResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    isSaved: boolean;
  };
}
