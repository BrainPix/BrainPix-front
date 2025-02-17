import axios, { AxiosInstance } from 'axios';
import { IdeaMarketCheck } from '../types/mainType';

const BASE_URL = import.meta.env.VITE_BASE_URL;

// axios 인스턴스 생성
const apiClient: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, // 10초
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
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

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // 토큰 만료 등의 인증 에러
      localStorage.removeItem('accessToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  },
);

export interface GetIdeaListRequest {
  type: 'IDEA_SOLUTION' | 'MARKET_PLACE';
  page?: number;
  size?: number;
  category?: string;
  keyword?: string;
  onlyCompany?: boolean;
  sortType?: string;
}

interface SearchParams {
  type: 'IDEA_SOLUTION' | 'MARKET_PLACE';
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

export const getPopularIdeas = async (params: SearchParams) => {
  try {
    const response = await apiClient.get<IdeaMarketCheck>(
      'idea-markets/search/popular',
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
  } catch {
    throw Error;
  }
};

export const getIdeaMarketDetail = async (ideaId: number) => {
  try {
    const response = await apiClient.get<IdeaMarketCheck>(`
      idea-markets/${ideaId}`);

    if (!response.data) {
      throw new Error('데이터가 없습니다.');
    }

    return response.data.data;
  } catch {
    throw Error;
  }
};

// 재시도 로직 추가
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
  } catch {
    throw Error;
  }
};

export const getIdeaList = async (params: GetIdeaListRequest) => {
  try {
    const response = await apiClient.post<IdeaMarketCheck>(
      'idea-markets/search',
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
  } catch {
    throw Error;
  }
};
