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
import { checkAccessToken } from '../utils/checkAccessToken';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getPostIdeaMarket = async (
  page = 0,
  size = 10,
): Promise<PostApiResponse<IdeaMarket>> => {
  const url = `${BASE_URL}/post-management/idea-market`;
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

export const getPostRequestTask = async (
  page = 0,
  size = 10,
): Promise<PostApiResponse<RequestTask>> => {
  const url = `${BASE_URL}/post-management/request-task`;
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

export const getPostCollaboration = async (
  page = 0,
  size = 10,
): Promise<PostApiResponse<Collaboration>> => {
  const url = `${BASE_URL}/post-management/collaboration`;
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

export const getPostIdeaMarketDetail = async (
  postId: number,
): Promise<IdeaMarketDetail> => {
  const url = `${BASE_URL}/post-management/idea-market/${postId}`;
  const token = checkAccessToken();

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
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
  const token = checkAccessToken();

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
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
  const token = checkAccessToken();

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
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
  const token = checkAccessToken();

  try {
    axios.post(
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

export const postRejectRequestApplication = async (
  purchasingId: number,
): Promise<void> => {
  const url = `${BASE_URL}/post-management/request-task/application/${purchasingId}/reject`;
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

export const postAcceptCollaborationApplication = async (
  gatheringId: number,
): Promise<void> => {
  const url = `${BASE_URL}/post-management/collaboration/application/${gatheringId}/accept`;
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

export const postRejectCollaborationApplication = async (
  gatheringId: number,
): Promise<void> => {
  const url = `${BASE_URL}/post-management/collaboration/application/${gatheringId}/reject`;
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

export const deletePost = async (
  postId: number,
  postType: 'idea-markets' | 'request-tasks' | 'collaborations',
): Promise<void> => {
  const url = `${BASE_URL}/${postType}/${postId}`;
  const token = checkAccessToken();

  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch {
    throw Error;
  }
};
