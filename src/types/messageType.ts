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

export interface getMessagesResponseType {
  messageId: string;
  title: string;
  senderNickname: string;
  receiverNickname: string;
  sendDate: string;
  isRead: boolean;
  messageType: MessagesKeyType;
}

export interface getMessageDetailResponseType {
  id: string;
  title: string;
  senderNickname: string;
  receiverNickname: string;
  sendTime: string;
  content: string;
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
