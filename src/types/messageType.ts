export interface MessageType {
  id: number;
  root: string[];
  date: string;
  name: string;
  content: string;
  isRead: boolean;
}

export type MessagesKeyType = 'ALL' | 'READ' | 'UNREAD';
export type MessagesType = Record<MessagesKeyType, MessageType[]>;

export interface PreviousMessageType {
  receiver: string;
  previousContent: string;
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
