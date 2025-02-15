import axios from 'axios';
import { IdeaMarketCheck } from '../types/mainType';

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface SearchParams {
  type: 'IDEA_SOLUTION' | 'MARKET_PLACE';
  page?: number;
  size?: number;
}

export const getPopularIdeas = async (params: SearchParams) => {
  const token = localStorage.getItem('accessToken');
  const url = `${BASE_URL}idea-markets/search/popular`; // URL 경로 수정

  try {
    const { data } = await axios.get<IdeaMarketCheck>(url, {
      params: {
        type: params.type,
        page: params.page || 0,
        size: params.size || 10,
      },
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : undefined,
    });

    return data;
  } catch (error) {
    console.error('인기 아이디어 조회 중 오류 발생:', error);
    throw error;
  }
};

export const getIdeaMarketDetail = async (ideaId: number) => {
  const token = localStorage.getItem('accessToken');
  const url = `${BASE_URL}idea-markets/${ideaId}`;

  try {
    const { data } = await axios.get<IdeaMarketCheck>(url, {
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : undefined,
    });

    return data.data;
  } catch (error) {
    console.error('아이디어 상세 정보 조회 중 오류 발생:', error);
    throw error;
  }
};
