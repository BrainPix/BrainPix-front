import axios from 'axios';
import { checkAccessToken } from '../utils/checkAccessToken';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getIdeaMarketPayment = async (ideaId: number) => {
  const token = checkAccessToken();
  if (!token) return null;

  const url = `${BASE_URL}/idea-markets/${ideaId}/purchase`;

  try {
    const { data } = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data;
  } catch {
    throw Error;
  }
};
