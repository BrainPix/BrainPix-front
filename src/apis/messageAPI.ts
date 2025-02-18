import axios from 'axios';
import { MessagesKeyType, sendMessagePayloadType } from '../types/messageType';

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/messages`;

export const getMessages = async (status: MessagesKeyType, page: number) => {
  const token = localStorage.getItem('accessToken');
  const url = `${BASE_URL}?status=${status}&page=${page}&size=3`;

  if (token) {
    const { data } = await axios(url, {
      headers: { Authorization: token },
    });
    return data;
  }
};

export const getMessagesDetail = async (id: string) => {
  const token = localStorage.getItem('accessToken');
  const url = `${BASE_URL}/${id}`;

  if (token) {
    const { data } = await axios(url, {
      headers: { Authorization: token },
    });
    return data;
  }
};

export const sendMessages = async (payload: sendMessagePayloadType) => {
  const token = localStorage.getItem('accessToken');
  const url = `${BASE_URL}`;

  if (token) {
    const { data } = await axios.post(url, payload, {
      headers: { Authorization: token },
    });
    return data;
  }
};

export const getMessageCount = async () => {
  const token = localStorage.getItem('accessToken');
  const url = `${BASE_URL}/count`;

  if (token) {
    const { data } = await axios(url, {
      headers: { Authorization: token },
    });
    return data?.data;
  }
};
