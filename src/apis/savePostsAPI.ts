import axios from 'axios';
import {
  IdeaMarket,
  RequestTask,
  Collaboration,
  PostApiResponse,
} from '../types/postDataType';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getSavedIdeaMarkets = async (
  page = 0,
  size = 1,
): Promise<PostApiResponse<IdeaMarket>> => {
  const url = `${BASE_URL}/saved-posts/idea-markets`;
  const API_TOKEN = localStorage.getItem('accessToken');

  if (!API_TOKEN) {
    console.error('API_TOKEN이 없습니다! 다시 로그인하세요.');
    window.location.href = 'login/personal';
  }

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
      params: { page, size },
    });

    console.log('저장된 아이디어 마켓 게시물 API 응답 데이터:', response.data);
    console.log(
      '저장된 아이디어 마켓 게시물 API 응답 데이터 content:',
      response.data?.data?.content,
    );

    return response.data.data;
  } catch (error) {
    console.error('API 요청 실패:', error);
    throw error;
  }
};

export const getSavedRequestTasks = async (
  page = 0,
  size = 1,
): Promise<PostApiResponse<RequestTask>> => {
  const url = `${BASE_URL}/saved-posts/request-tasks`;
  const API_TOKEN = localStorage.getItem('accessToken');

  if (!API_TOKEN) {
    console.error('API_TOKEN이 없습니다! 다시 로그인하세요.');
    window.location.href = 'login/personal';
  }

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
      params: { page, size },
    });

    console.log('저장된 요청 과제 게시물 API 응답 데이터:', response.data);
    console.log(
      '저장된 요청 과제 게시물 API 응답 데이터 content:',
      response.data?.data?.content,
    );

    return response.data.data;
  } catch (error) {
    console.error('API 요청 실패:', error);
    throw error;
  }
};

export const getSavedCollaborationHubs = async (
  page = 0,
  size = 1,
): Promise<PostApiResponse<Collaboration>> => {
  const url = `${BASE_URL}/saved-posts/collaboration-hubs`;
  const API_TOKEN = localStorage.getItem('accessToken');

  if (!API_TOKEN) {
    console.error('API_TOKEN이 없습니다! 다시 로그인하세요.');
    window.location.href = 'login/personal';
  }

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
      params: { page, size },
    });

    console.log('저장된 협업 광장 게시물 API 응답 데이터:', response.data);
    console.log(
      '저장된 협업 광장 게시물 API 응답 데이터 content:',
      response.data?.data?.content,
    );

    return response.data.data;
  } catch (error) {
    console.error('API 요청 실패:', error);
    throw error;
  }
};

export const postSavedPosts = async (postId: number): Promise<void> => {
  const url = `${BASE_URL}/saved-posts?postId=${postId}`;
  const API_TOKEN = localStorage.getItem('accessToken');

  if (!API_TOKEN) {
    console.error('API_TOKEN이 없습니다! 다시 로그인하세요.');
    window.location.href = 'login/personal';
  }

  try {
    const response = await axios.post(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      },
    );

    console.log('게시글 저장 및 해제 api 요청 성공:', response.data);
  } catch (error) {
    console.error('게시글 저장 및 해제 api 요청 실패:', error);
    throw error;
  }
};
