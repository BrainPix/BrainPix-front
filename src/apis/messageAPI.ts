import axios from 'axios';
import { MessagesKeyType, sendMessagePayloadType } from '../types/messageType';
import { checkAccessToken } from '../utils/checkAccessToken';

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/messages`;

export const getMessages = async (status: MessagesKeyType, page: number) => {
  const token = checkAccessToken();
  if (!token) return null;

  const url = `${BASE_URL}?status=${status}&page=${page}&size=3`;

  try {
    const { data } = await axios(url, {
      headers: { Authorization: token },
    });
    return data;
  } catch {
    throw Error;
  }
};

export const getMessagesDetail = async (id: string) => {
  const token = checkAccessToken();
  if (!token) return null;

  const url = `${BASE_URL}/${id}`;

  try {
    const { data } = await axios(url, {
      headers: { Authorization: token },
    });
    return data?.data;
  } catch {
    throw Error;
  }
};

export const sendMessages = async (payload: sendMessagePayloadType) => {
  const token = checkAccessToken();
  if (!token) return null;

  const url = `${BASE_URL}`;

  try {
    const { data } = await axios.post(url, payload, {
      headers: { Authorization: token },
    });
    return data;
  } catch {
    throw Error;
  }
};

export const getMessageCount = async () => {
  const token = checkAccessToken();
  if (!token) return null;

  const url = `${BASE_URL}/count`;

  try {
    const { data } = await axios(url, {
      headers: { Authorization: token },
    });
    return data?.data;
  } catch {
    throw Error;
  }
};

export const patchMessageRead = async (messageId: string) => {
  const token = checkAccessToken();
  if (!token) return null;

  const url = `${BASE_URL}/${messageId}`;

  try {
    const { data } = await axios.patch(
      url,
      {},
      {
        headers: { Authorization: token },
      },
    );
    return data?.data;
  } catch {
    throw Error;
  }
};
