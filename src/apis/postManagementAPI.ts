import axios from 'axios';
import {
  IdeaMarket,
  RequestTask,
  Collaboration,
  IdeaMarketDetail,
  RequestTaskDetail,
  CollaborationDetail,
  PostApiResponse,
} from '../types/postDataType';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getPostIdeaMarket = async (
  page = 0,
  size = 10,
): Promise<PostApiResponse<IdeaMarket>> => {
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

    return response.data.data;
  } catch {
    throw Error;
  }
};

export const getPostRequestTask = async (
  page = 0,
  size = 10,
): Promise<PostApiResponse<RequestTask>> => {
  const url = `${BASE_URL}/post-management/request-task`;
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

    return response.data.data;
  } catch {
    throw Error;
  }
};

export const getPostCollaboration = async (
  page = 0,
  size = 10,
): Promise<PostApiResponse<Collaboration>> => {
  const url = `${BASE_URL}/post-management/collaboration`;
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

    return response.data.data;
  } catch {
    throw Error;
  }
};

export const getPostIdeaMarketDetail = async (
  postId: number,
): Promise<IdeaMarketDetail> => {
  const url = `${BASE_URL}/post-management/idea-market/${postId}`;
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
    });

    return response.data.data;
  } catch {
    throw Error;
  }
};

export const getPostRequestTaskDetail = async (
  postId: number,
): Promise<RequestTaskDetail> => {
  const url = `${BASE_URL}/post-management/request-task/${postId}`;
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
    });

    return response.data.data;
  } catch {
    throw Error;
  }
};

export const getPostCollaborationDetail = async (
  postId: number,
): Promise<CollaborationDetail> => {
  const url = `${BASE_URL}/post-management/collaboration/${postId}`;
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
    });

    return response.data.data;
  } catch {
    throw Error;
  }
};

export const postAcceptRequestApplication = async (
  purchasingId: number,
): Promise<void> => {
  const url = `${BASE_URL}/post-management/request-task/application/${purchasingId}/accept`;
  const API_TOKEN = localStorage.getItem('accessToken');

  if (!API_TOKEN) {
    console.error('API_TOKEN이 없습니다! 다시 로그인하세요.');
    window.location.href = 'login/individual';
  }

  try {
    axios.post(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      },
    );
  } catch {
    throw Error;
  }
};

export const postRejectRequestApplication = async (
  purchasingId: number,
): Promise<void> => {
  const url = `${BASE_URL}/post-management/request-task/application/${purchasingId}/reject`;
  const API_TOKEN = localStorage.getItem('accessToken');

  if (!API_TOKEN) {
    console.error('API_TOKEN이 없습니다! 다시 로그인하세요.');
    window.location.href = 'login/individual';
  }

  try {
    await axios.post(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      },
    );
  } catch {
    throw Error;
  }
};

export const postAcceptCollaborationApplication = async (
  gatheringId: number,
): Promise<void> => {
  const url = `${BASE_URL}/post-management/collaboration/application/${gatheringId}/accept`;
  const API_TOKEN = localStorage.getItem('accessToken');

  if (!API_TOKEN) {
    console.error('API_TOKEN이 없습니다! 다시 로그인하세요.');
    window.location.href = 'login/individual';
  }

  try {
    await axios.post(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      },
    );
  } catch {
    throw Error;
  }
};

export const postRejectCollaborationApplication = async (
  gatheringId: number,
): Promise<void> => {
  const url = `${BASE_URL}/post-management/collaboration/application/${gatheringId}/reject`;
  const API_TOKEN = localStorage.getItem('accessToken');

  if (!API_TOKEN) {
    console.error('API_TOKEN이 없습니다! 다시 로그인하세요.');
    window.location.href = 'login/individual';
  }

  try {
    await axios.post(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${API_TOKEN}`,
        },
      },
    );
  } catch {
    throw Error;
  }
};

export const deletePost = async (
  postId: number,
  postType: 'idea-markets' | 'request-tasks' | 'collaborations',
): Promise<void> => {
  const url = `${BASE_URL}/${postType}/${postId}`;
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

    return response.data;
  } catch (error) {
    console.error('아이디어 마켓 게시글 삭제 실패:', error);
    throw error;
  }
};
