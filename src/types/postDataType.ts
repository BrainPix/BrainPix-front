export interface Post {
  ideaId: number;
  auth: string;
  writerImageUrl: string;
  writerName: string;
  specialization: string;
  title: string;
  thumbnailImage: string | null;
  price: number;
  // deadline?: number;
  // current?: number;
  // total?: number;
  saveCount?: number;
  viewCount?: number;
}

export interface PostApiResponse {
  content: Post[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
  size: number;
  hasNext: boolean;
}
