export interface IdeaMarketCheck {
  success: true;
  code: string;
  message: string;
  data: {
    content: [
      {
        ideaId: number;
        auth: 'ALL' | 'COMPANY' | 'ME';
        writerImageUrl: string;
        writerName: string;
        thumbnailImageUrl: string;
        title: string;
        price: number;
        category: string;
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

export interface GetIdeaListRequest {
  type: 'IDEA_SOLUTION' | 'MARKET_PLACE';
  page?: number;
  size?: number;
  category?: string;
  keyword?: string;
  onlyCompany?: boolean;
  sortType?: string;
}

export interface SearchParams {
  type: 'IDEA_SOLUTION' | 'MARKET_PLACE';
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
