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
  image?: string;
  price?: string;
  deadline?: string;
  memberInfo?: string;
}
