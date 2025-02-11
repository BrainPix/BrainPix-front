import axios from 'axios';
import { PostApiResponse } from '../types/postDataType';

const BASE_URL = import.meta.env.VITE_BASE_URL;

console.log('API BASE_URL: ', BASE_URL);

export const getPostIdeaMarket = async (
  page = 0,
  size = 10,
): Promise<PostApiResponse> => {
  const url = `${BASE_URL}/post-management/idea-market`;
  const API_TOKEN = localStorage.getItem('accessToken');

  if (!API_TOKEN) {
    console.error('API_TOKEN이 없습니다! 다시 로그인하세요.');
    window.location.href = 'login/individual';
  }

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
      params: { page, size },
    });

    console.log('API 응답 데이터:', response.data);
    console.log('API 응답 데이터 content:', response.data?.data?.content);

    return response.data.data;
  } catch (error) {
    console.error('API 요청 실패:', error);
    throw error;
  }
};
