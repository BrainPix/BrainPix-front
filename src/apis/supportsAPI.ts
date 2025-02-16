import axios from 'axios';
import { Purchase, RequestTasks, Collaborations } from '../types/supportsType';

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
    window.location.href = 'login/individual';
    return [];
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

    return response.data?.data?.content ?? [];
  } catch (error) {
    console.error('API 요청 실패:', error);
    return [];
  }
};

export const getAcceptedRequestTasks = async (
  page = 0,
  size = 10,
): Promise<RequestTasks[]> => {
  const url = `${BASE_URL}/supports/request-tasks/accepted`;
  const API_TOKEN = localStorage.getItem('accessToken');

  if (!API_TOKEN) {
    console.error('API_TOKEN이 없습니다! 다시 로그인하세요.');
    window.location.href = 'login/individual';
    return [];
  }

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
      params: { page, size },
    });

    //console.log('수락된 요청 과제 데이터:', response.data);
    return response.data?.data?.content ?? [];
  } catch (error) {
    console.error('API 요청 실패:', error);
    return [];
  }
};

export const getRejectedRequestTasks = async (
  page = 0,
  size = 10,
): Promise<RequestTasks[]> => {
  const url = `${BASE_URL}/supports/request-tasks/rejected`;
  const API_TOKEN = localStorage.getItem('accessToken');

  console.log('요청 URL:', url);
  console.log('요청 파라미터:', { page, size });

  if (!API_TOKEN) {
    console.error('API_TOKEN이 없습니다! 다시 로그인하세요.');
    window.location.href = 'login/individual';
    return [];
  }

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
      params: { page, size },
    });

    console.log('거절된 요청 과제 데이터:', response.data);
    console.log('거절된 요청 과제 데이터:', response.data?.data);
    return response.data?.data?.content ?? [];
  } catch (error) {
    console.error('API 요청 실패:', error);
    return [];
  }
};

export const deleteRejectedRequestTasks = async (
  purchasingId: number,
): Promise<void> => {
  const url = `${BASE_URL}/supports/request-tasks/${purchasingId}`;
  const API_TOKEN = localStorage.getItem('accessToken');

  if (!API_TOKEN) {
    console.error('API_TOKEN이 없습니다! 다시 로그인하세요.');
    window.location.href = 'login/individual';
  }

  try {
    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    console.log(`요청 과제 ${purchasingId}번 게시글 삭제 성공`);
  } catch (error) {
    console.error('삭제 요청 실패:', error);
    throw error;
  }
};

export const getAcceptedCollaborations = async (
  page = 0,
  size = 10,
): Promise<Collaborations[]> => {
  const url = `${BASE_URL}/supports/collaborations/accepted`;
  const API_TOKEN = localStorage.getItem('accessToken');

  if (!API_TOKEN) {
    console.error('API_TOKEN이 없습니다! 다시 로그인하세요.');
    window.location.href = 'login/individual';
    return [];
  }

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
      params: { page, size },
    });

    console.log('협업 광장 : 지원 완료');
    console.log('수락된 협업 광장 데이터:', response.data);
    console.log('수락된 협업 광장 데이터:', response.data?.data);
    return response.data?.data?.content ?? [];
  } catch (error) {
    console.error('API 요청 실패:', error);
    return [];
  }
};

export const getRejectedCollaborations = async (
  page = 0,
  size = 10,
): Promise<Collaborations[]> => {
  const url = `${BASE_URL}/supports/collaborations/rejected`;
  const API_TOKEN = localStorage.getItem('accessToken');

  console.log('요청 URL:', url);
  console.log('요청 파라미터:', { page, size });

  if (!API_TOKEN) {
    console.error('API_TOKEN이 없습니다! 다시 로그인하세요.');
    window.location.href = 'login/individual';
    return [];
  }

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
      params: { page, size },
    });

    console.log('거절된 협업 광장 데이터:', response.data);
    console.log('거절된 협업 광장 데이터:', response.data?.data);
    return response.data?.data?.content ?? [];
  } catch (error) {
    console.error('API 요청 실패:', error);
    return [];
  }
};

export const deleteRejectedCollaborations = async (
  collectionGatheringId: number,
): Promise<void> => {
  const url = `${BASE_URL}/supports/collaborations/${collectionGatheringId}`;
  const API_TOKEN = localStorage.getItem('accessToken');

  if (!API_TOKEN) {
    console.error('API_TOKEN이 없습니다! 다시 로그인하세요.');
    window.location.href = 'login/individual';
  }

  try {
    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });

    console.log(`협업 광장 ${collectionGatheringId}번 게시글 삭제 성공`);
  } catch (error) {
    console.error('삭제 요청 실패:', error);
    throw error;
  }
};
