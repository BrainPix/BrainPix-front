export interface MessageType {
  id: number;
  root: string[];
  date: string;
  name: string;
  content: string;
  isRead: boolean;
}

export type MessagesKeyType = 'ALL' | 'SEND' | 'RECEIVED';
export type MessagesType = Record<MessagesKeyType, MessageType[]>;

export interface PreviousMessageType {
  receiverNickname: string;
  title?: string;
  content?: string;
}

export interface getMessageResponseType {
  messageId: string;
  title: string;
  senderNickname: string;
  sendDate: string;
}

export interface sendMessagePayloadType {
  receiverNickname: string;
  title: string;
  content: string;
}

export interface sendMessageCountResponseType {
  readMessageCount: number;
  unreadMessageCount: number;
}
