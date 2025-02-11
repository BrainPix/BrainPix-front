import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

console.log('API BASE_URL: ', BASE_URL);

export const getPostIdeaMarket = async (page: number, size: number) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/post-management/idea-market`,
      {
        params: { page, size },
      },
    );
    return response.data;
  } catch (error) {
    console.error('게시물 불러오기 실패:', error);
    throw error;
  }
};
