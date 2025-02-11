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
  deadline?: string;
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
  deadline?: string;
  specialization: string;
  saveCount?: number;
  viewCount?: number;
  totalQuantity?: number;
  occupiedQuantity?: number;
}

export interface PostApiResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
  size: number;
  hasNext: boolean;
}
