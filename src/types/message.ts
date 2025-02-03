export interface MessageType {
  id: number;
  root: string[];
  date: string;
  name: string;
  content: string;
  isRead: boolean;
}

export type MessagesKeyType = 'all' | 'receive' | 'send';
export type MessagesType = Record<MessagesKeyType, MessageType[]>;

export interface PreviousMessageType {
  receiver: string;
  sender: string;
  previousContent: string;
}
