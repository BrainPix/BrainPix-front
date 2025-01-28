export enum PostCategories {
  IDEA_MARKET = 'ideaMarket',
  REQUEST_ASSIGN = 'requestAssign',
  COLLABORATION = 'collaboration',
}

export interface PostProps {
  id: number;
  category: PostCategories;
  user: string;
  profileImage: string | null;
  title: string;
  postImage: string | null;
  price?: number;
  deadline?: number;
  current?: number; // 현재 인원
  total?: number; // 총 모집 인원
  saveCount?: number;
  viewCount?: number;
}
