import axios from 'axios';
import { Purchase } from '../types/purchaseType';

const BASE_URL = import.meta.env.VITE_BASE_URL;

console.log('API BASE_URL: ', BASE_URL);

export const getPurchases = async (
  page = 0,
  size = 10,
): Promise<Purchase[]> => {
  const url = `${BASE_URL}/supports/idea-market/purchases`;

  const API_TOKEN = localStorage.getItem('accessToken');

  if (!API_TOKEN) {
    console.error('API_TOKEN이 없습니다! 다시 로그인하세요.');
    window.location.href = 'users/login';
    return [];
  }

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
      params: { page, size },
    });

    console.log('API 응답 데이터:', response.data); // 🔹 응답 데이터 출력
    console.log('API 응답 데이터 content:', response.data?.data?.content); // 🔹 실제 content 데이터 출력

    return response.data?.data?.content ?? []; // 🔹 데이터가 undefined면 빈 배열 반환
  } catch (error) {
    console.error('API 요청 실패:', error);
    return [];
  }
};
