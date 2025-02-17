export interface IdeaMarket {
  ideaId: number;
  auth: string;
  writerImageUrl: string;
  writerName: string;
  specialization: string;
  title: string;
  thumbnailImageUrl: string | null;
  price: number;
  saveCount?: number;
  viewCount?: number;
}

export interface RequestTask {
  ideaId: number;
  auth: string;
  writerImageUrl: string;
  writerName: string;
  specialization: string;
  title: string;
  thumbnailImageUrl: string | null;
  deadLine?: string;
  saveCount?: number;
  viewCount?: number;
}
