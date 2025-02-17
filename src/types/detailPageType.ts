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

export interface RequsetDetail {
  taskId: number;
  thumbnailImageUrl: string;
  category: string;
  taskType: string;
  deadline: number;
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
  recruitments: {
    recruitmentId: number;
    domain: string;
    occupiedQuantity: number;
    totalQuantity: number;
    price: number;
    paymentDuration: string;
  }[];
  openMyProfile: boolean;
}

export interface CollaborationDetail {
  collaborationId: number;
  title: string;
  content: string;
  category: string;
  taskType: string;
  deadline: string;
  auth: string;
  viewCount: number;
  saveCount: number;
  createdDate: string;
  attachments: string[];
  price: number;
  paymentDuration: string;
  link: string;
  thumbnailImageUrl: string;
  writer: {
    writerId: number;
    name: string;
    profileImageUrl: string;
    role: string;
    specialization: string;
    totalIdeas: number;
    totalCollaborations: number;
  };
  recruitments: {
    recruitmentId: number;
    domain: string;
    occupiedQuantity: number;
    totalQuantity: number;
    price: number;
    paymentDuration: string;
  }[];
  openMembers: {
    userId: number;
    name: string;
    domain: string;
  }[];
  openMyProfile: boolean;
  isSavedPost: boolean;
  isMyPost: boolean;
}
