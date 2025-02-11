export interface Post {
  postId: number;
  category: string;
  user: string;
  profileImage?: string | null;
  title: string;
  thumbnailImage: string | null;
  price: number;
  deadline?: number;
  current?: number;
  total?: number;
  saveCount?: number;
  viewCount?: number;
  purchaseHistory: [
    {
      buyerID: string;
      userId: number;
      payment: string;
      totalPay: number;
    },
  ];
}

export interface PostApiResponse {
  content: Post[];
  totalPages: number;
  totalElements: number;
}
