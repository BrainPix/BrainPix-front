import axios from 'axios';
import {
  IdeaMarket,
  RequestTask,
  Collaboration,
  PostApiResponse,
} from '../types/postDataType';
import { checkAccessToken } from '../utils/checkAccessToken';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getSavedIdeaMarkets = async (
  page = 0,
  size = 1,
): Promise<PostApiResponse<IdeaMarket>> => {
  const url = `${BASE_URL}/saved-posts/idea-markets`;
  const token = checkAccessToken();

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { page, size },
    });

    return response.data.data;
  } catch {
    throw Error;
  }
};

export const getSavedRequestTasks = async (
  page = 0,
  size = 1,
): Promise<PostApiResponse<RequestTask>> => {
  const url = `${BASE_URL}/saved-posts/request-tasks`;
  const token = checkAccessToken();

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { page, size },
    });

    return response.data.data;
  } catch {
    throw Error;
  }
};

export const getSavedCollaborationHubs = async (
  page = 0,
  size = 1,
): Promise<PostApiResponse<Collaboration>> => {
  const url = `${BASE_URL}/saved-posts/collaboration-hubs`;
  const token = checkAccessToken();

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { page, size },
    });

    return response.data.data;
  } catch {
    throw Error;
  }
};

export const postSavedPosts = async (postId: number): Promise<void> => {
  const url = `${BASE_URL}/saved-posts?postId=${postId}`;
  const token = checkAccessToken();

  try {
    await axios.post(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
  } catch {
    throw Error;
  }
};
