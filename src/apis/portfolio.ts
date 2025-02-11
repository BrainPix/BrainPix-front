import axios from 'axios';
import { EditProfilePayload, PostPortfolioPayload } from '../types/myPageType';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getMyPorfolio = async (page: number) => {
  const token = localStorage.getItem('accessToken');
  const url = `${BASE_URL}/portfolios?page=${page}&size=8`;

  if (token) {
    const { data } = await axios(url, {
      headers: { Authorization: token },
    });
    return data;
  }
};

export const postPorfolio = async (payload: PostPortfolioPayload) => {
  const token = localStorage.getItem('accessToken');
  const url = `${BASE_URL}/portfolios`;

  if (token) {
    const { data } = await axios.post(url, payload, {
      headers: { Authorization: token },
    });
    return data;
  }
};

export const getPorfolioDetail = async (cardId: number) => {
  const token = localStorage.getItem('accessToken');
  const url = `${BASE_URL}/portfolios/${cardId}`;

  if (token) {
    const { data } = await axios(url, {
      headers: { Authorization: token },
    });
    return data;
  }
};

export const putPorfolioDetail = async (
  cardId: number,
  payload: EditProfilePayload,
) => {
  const token = localStorage.getItem('accessToken');
  const url = `${BASE_URL}/portfolios/${cardId}`;

  if (token) {
    const { data } = await axios.put(url, payload, {
      headers: { Authorization: token },
    });
    return data;
  }
};
