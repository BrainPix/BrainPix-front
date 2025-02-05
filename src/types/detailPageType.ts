export interface IdeaMarketDetail {
  ideaId: number;
  thumbnailImageUrl: string;
  category: string;
  ideaMarketType: string;
  auth: string;
  title: string;
  content: string;
  price: number;
  viewCount: number;
  saveCount: number;
  totalQuantity: number;
  occupiedQuantity: number;
  createdDate: string;
  writer: {
    writerId: number;
    name: string;
    profileImageUrl: string;
    role: string;
    specialization: string;
    totalIdeas: number;
    totalCollaborations: number;
  };
  attachments: string[];
}
