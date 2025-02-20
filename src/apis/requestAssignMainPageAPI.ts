import axios, { AxiosInstance } from 'axios';
import {
  RequestAssignCheck,
  GetIdeaListRequest,
  SearchParams,
  BookmarkResponse,
} from '../types/registerType';

const BASE_URL = import.meta.env.VITE_BASE_URL;

const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export const getPopularIdeas = async (params: SearchParams) => {
  const response = await apiClient.get<RequestAssignCheck>(
    'request-tasks/search/popular',
    {
      params: {
        type: params.type,
        page: params.page ?? 0,
        size: params.size ?? 10,
      },
    },
  );

  if (!response.data) {
    throw new Error('데이터가 없습니다.');
  }

  return response.data;
};

export const getRequestAssignDetail = async (taskId: number) => {
  const response = await apiClient.get<RequestAssignCheck>(`
    request-tasks/${taskId}`);

  if (!response.data) {
    throw new Error('데이터가 없습니다.');
  }

  return response.data.data;
};

export const withRetry = async <T>(
  fn: () => Promise<T>,
  retries = 3,
  delay = 1000,
): Promise<T> => {
  try {
    return await fn();
  } catch (error) {
    if (retries === 0) throw error;
    await new Promise((resolve) => setTimeout(resolve, delay));
    return withRetry(fn, retries - 1, delay * 2);
  }
};

export const toggleIdeaBookmark = async (postId: number) => {
  const response = await apiClient.post<BookmarkResponse>('saved-posts', null, {
    params: { postId },
  });

  if (!response.data) {
    throw new Error('데이터가 없습니다.');
  }

  return response.data;
};

export const getIdeaList = async (params: GetIdeaListRequest) => {
  const response = await apiClient.post<RequestAssignCheck>(
    'request-tasks/search',
    {
      type: params.type,
      category: params.category,
      keyword: params.keyword,
      onlyCompany: params.onlyCompany,
      sortType: params.sortType,
    },
    {
      params: {
        page: params.page ?? 0,
        size: params.size ?? 10,
      },
    },
  );

  if (!response.data) {
    throw new Error('데이터가 없습니다.');
  }

  return response.data;
};
