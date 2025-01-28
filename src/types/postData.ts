export enum PostCategories {
  IDEA_MARKET = 'ideaMarket',
  REQUEST_ASSIGN = 'requestAssign',
  COLLABORATION = 'collaboration',
}

export interface PostProps {
  id: number;
  category: PostCategories;
  user: string;
  title: string;
  image: string | null;
  price?: number;
  deadline?: number;
  current?: number;
  total?: number;
  saveCount?: number;
  viewCount?: number;
}
