export interface MessageType {
  id: number;
  root: string[];
  date: string;
  name: string;
  content: string;
}

export type MessagesKeyType = 'all' | 'receive' | 'send';

export type MessagesType = Record<MessagesKeyType, MessageType[]>;
