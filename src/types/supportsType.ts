export interface Purchase {
  purchasingId: number;
  purchasedAt: string;
  specialization: string;
  title: string;
  writerName: string;
  writerType: string;
  middlePrice: number;
  quantity: number;
  fee: number;
  finalPrice: number;
  ideaMarketId: number;
}

export interface RequestTasks {
  purchasingId: number;
  firstImage: string;
  postCreatedAt: string;
  postTitle: string;
  specialization: string;
  domain: string;
  writerName: string;
  writerType: string;
  requestTaskId: number;
}
