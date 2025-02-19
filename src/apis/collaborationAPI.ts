import axios, { AxiosInstance } from 'axios';
import { CollaborationCheck } from '../types/collaborationType';

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

export interface GetCollaborationListRequest {
  page?: number;
  size?: number;
  category?: string;
  keyword?: string;
  onlyCompany?: boolean;
  sortType?: string;
}

interface SearchParams {
  page?: number;
  size?: number;
}

interface BookmarkResponse {
  success: boolean;
  code: string;
  message: string;
  data: {
    isSaved: boolean;
  };
}

export const getPopularCollaborations = async (params: SearchParams) => {
  try {
    const response = await apiClient.get<CollaborationCheck>(
      'collaborations/search/popular',
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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('인기 협업 조회 실패:', error.message);
      if (error.response) {
        console.error('서버 응답:', error.response.data);
      }
    }
    throw error;
  }
};

export const getCollaborationDetail = async (collaborationId: number) => {
  try {
    const response = await apiClient.get<CollaborationCheck>(
      `collaborations/${collaborationId}`,
    );

    if (!response.data) {
      throw new Error('데이터가 없습니다.');
    }

    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('협업 상세 정보 조회 실패:', error.message);
      if (error.response) {
        console.error('서버 응답:', error.response.data);
      }
    }
    throw error;
  }
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

export const toggleCollaborationBookmark = async (postId: number) => {
  try {
    const response = await apiClient.post<BookmarkResponse>(
      'saved-posts',
      null,
      {
        params: { postId },
      },
    );

    if (!response.data) {
      throw new Error('데이터가 없습니다.');
    }

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('북마크 토글 실패:', error.message);
      if (error.response) {
        console.error('서버 응답:', error.response.data);
      }
    }
    throw error;
  }
};

export const getCollaborationList = async (
  params: GetCollaborationListRequest,
) => {
  try {
    const response = await apiClient.post<CollaborationCheck>(
      'collaborations/search',
      {
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
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('협업 목록 조회 실패:', error.message);
      if (error.response) {
        console.error('서버 응답:', error.response.data);
      }
    }
    throw error;
  }
};
