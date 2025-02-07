import { MessagesType } from '../types/messageType';

export const MESSAGES_TEMP: MessagesType = {
  all: [
    {
      id: 1,
      root: ['협업광장', '기획'],
      date: '12월 29일',
      name: 'SEO YEON',
      content: 'Web 서비스 게시글 관련 제안 드립니다.',
      isRead: false,
    },
    {
      id: 2,
      root: ['협업광장', '기획'],
      date: '12월 29일',
      name: 'SEO YEON',
      content: 'Web 서비스 게시글 관련 제안 드립니다.',
      isRead: true,
    },
  ],
  receive: [
    {
      id: 1,
      root: ['협업광장', '기획'],
      date: '12월 29일',
      name: 'SEO YEON',
      content: 'Web 서비스 게시글 관련 제안 드립니다.',
      isRead: false,
    },
    {
      id: 2,
      root: ['협업광장', '기획'],
      date: '12월 29일',
      name: 'SEO YEON',
      content: 'Web 서비스 게시글 관련 제안 드립니다.',
      isRead: true,
    },
  ],
  send: [],
};

export const PREVIOUS_MESSAGE_TEMP = {
  receiver: 'erwt',
  sender: 'SEO YEON KIM',
  previousContent: '이전 내용',
};
