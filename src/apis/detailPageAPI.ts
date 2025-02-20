import axios, { AxiosError } from 'axios';
import { checkAccessToken } from '../utils/checkAccessToken';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getIdeaMarketDetail = async (ideaId: number) => {
  const token = checkAccessToken();
  if (!token) return null;

  const url = `${BASE_URL}/idea-markets/${ideaId}`;

  try {
    const { data } = await axios(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      return null;
    }
    throw Error;
  }
};

export const getRequestDetail = async (taskId: number) => {
  const token = checkAccessToken();
  if (!token) return null;

  const url = `${BASE_URL}/request-tasks/${taskId}`;

  try {
    const { data } = await axios(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data;
  } catch (error) {
    if (error instanceof AxiosError && error.response?.status === 404) {
      return null;
    }
    throw Error;
  }
};

export const getCollaborationDetail = async (collaborationId: number) => {
  const token = checkAccessToken();
  if (!token) return null;

  const url = `${BASE_URL}/collaborations/${collaborationId}`;

  try {
    const { data } = await axios(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data;
  } catch {
    throw Error;
  }
};
