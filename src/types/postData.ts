export type PostCategory = (typeof PostCategories)[keyof typeof PostCategories];

export const PostCategories = {
  IDEA_MARKET: 'ideaMarket',
  REQUEST_ASSIGN: 'requestAssign',
  COLLABORATION: 'collaboration',
} as const;

export interface PostProps {
  category: PostCategory;
  user: string;
  title: string;
  image?: string;
  price?: string;
  deadline?: string;
  memberInfo?: string;
}
