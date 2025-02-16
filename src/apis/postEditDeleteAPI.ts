import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const deleteIdeaMarketPost = async (ideaId: number): Promise<void> => {
  const url = `${BASE_URL}/idea-markets/${ideaId}`;
  const API_TOKEN = localStorage.getItem('accessToken');

  if (!API_TOKEN) {
    console.error('API_TOKEN이 없습니다! 다시 로그인하세요.');
    window.location.href = '/login/personal';
    throw new Error('인증되지 않은 사용자입니다.');
  }

  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    console.log(`아이디어 마켓 ${ideaId}번 게시글 삭제 성공:`, response.data);
    return response.data;
  } catch (error) {
    console.error('아이디어 마켓 게시글 삭제 실패:', error);
    throw error;
  }
};
