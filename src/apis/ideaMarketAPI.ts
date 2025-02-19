import axios from 'axios';
import { checkAccessToken } from '../utils/checkAccessToken';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getMyIdeas = async (page: number) => {
  const token = checkAccessToken();
  if (!token) return null;

  const url = `${BASE_URL}/post-management/idea-market?page=${page}&size=3`;

  try {
    const { data } = await axios(url, {
      headers: { Authorization: token },
    });
    return data;
  } catch {
    throw Error;
  }
};
