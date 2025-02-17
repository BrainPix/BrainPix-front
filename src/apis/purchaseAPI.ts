import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getIdeaMarketPayment = async (ideaId: number) => {
  const token = localStorage.getItem('accessToken');
  const url = `${BASE_URL}/idea-markets/${ideaId}/purchase`;

  if (!token) throw new Error('Access Token이 없습니다.');

  const { data } = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data.data;
};
