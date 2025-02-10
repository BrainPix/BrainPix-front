export interface Comment {
  commentId: number;
  writerId: number;
  content: string;
  writerName: string;
  createdDate: string;
  parentCommentId: number | null;
  childComments: Comment[];
}

export interface CommentsResponse {
  [x: string]: unknown;
  content: Comment[];
  totalPages: number;
  totalElements: number;
  currentPage: number;
  size: number;
  hasNext: boolean;
}
