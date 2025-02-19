import axios from 'axios';
import { EditProfilePayload, PostPortfolioPayload } from '../types/myPageType';
import { checkAccessToken } from '../utils/checkAccessToken';

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface GetPortfoliosPropsType {
  page: number;
  size: number;
  userId: number;
}

export const getPorfolios = async ({
  page,
  size,
  userId,
}: GetPortfoliosPropsType) => {
  const token = checkAccessToken();
  if (!token) return null;

  const url = `${BASE_URL}/portfolios/${userId}/list`;

  try {
    const { data } = await axios(url, {
      headers: { Authorization: token },
      params: { page, size },
    });
    return data;
  } catch {
    throw Error;
  }
};

export const postPorfolio = async (payload: PostPortfolioPayload) => {
  const token = checkAccessToken();
  if (!token) return null;

  const url = `${BASE_URL}/portfolios`;

  try {
    const { data } = await axios.post(url, payload, {
      headers: { Authorization: token },
    });
    return data;
  } catch {
    throw Error;
  }
};

export const getPorfolioDetail = async (cardId: number) => {
  const token = checkAccessToken();
  if (!token) return null;

  const url = `${BASE_URL}/portfolios/${cardId}`;

  try {
    const { data } = await axios(url, {
      headers: { Authorization: token },
    });
    return data;
  } catch {
    throw Error;
  }
};

export const putPorfolioDetail = async (
  cardId: number,
  payload: EditProfilePayload,
) => {
  const token = checkAccessToken();
  if (!token) return null;

  const url = `${BASE_URL}/portfolios/${cardId}`;

  try {
    const { data } = await axios.put(url, payload, {
      headers: { Authorization: token },
    });
    return data;
  } catch {
    throw Error;
  }
};

export const deletePorfolioDetail = async (cardId: number) => {
  const token = checkAccessToken();
  if (!token) return null;

  const url = `${BASE_URL}/portfolios/${cardId}`;

  try {
    const { data } = await axios.delete(url, {
      headers: { Authorization: token },
    });
    return data;
  } catch {
    throw Error;
  }
};
