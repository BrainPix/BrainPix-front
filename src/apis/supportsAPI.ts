import axios from 'axios';
import { Purchase, RequestTasks, Collaborations } from '../types/supportsType';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getPurchases = async (
  page = 0,
  size = 10,
): Promise<Purchase[]> => {
  const url = `${BASE_URL}/supports/idea-market/purchases`;
  const API_TOKEN = localStorage.getItem('accessToken');

  if (!API_TOKEN) {
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

    return response.data?.data?.content ?? [];
  } catch {
    throw Error;
  }
};

export const getAcceptedRequestTasks = async (
  page = 0,
  size = 10,
): Promise<RequestTasks[]> => {
  const url = `${BASE_URL}/supports/request-tasks/accepted`;
  const API_TOKEN = localStorage.getItem('accessToken');

  if (!API_TOKEN) {
    window.location.href = 'login/individual';
  }

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
      params: { page, size },
    });

    return response.data?.data?.content ?? [];
  } catch {
    throw Error;
  }
};

export const getRejectedRequestTasks = async (
  page = 0,
  size = 10,
): Promise<RequestTasks[]> => {
  const url = `${BASE_URL}/supports/request-tasks/rejected`;
  const API_TOKEN = localStorage.getItem('accessToken');

  if (!API_TOKEN) {
    window.location.href = 'login/individual';
  }

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
      params: { page, size },
    });

    return response.data?.data?.content ?? [];
  } catch {
    throw Error;
  }
};

export const deleteRejectedRequestTasks = async (
  purchasingId: number,
): Promise<void> => {
  const url = `${BASE_URL}/supports/request-tasks/${purchasingId}`;
  const API_TOKEN = localStorage.getItem('accessToken');

  if (!API_TOKEN) {
    window.location.href = 'login/individual';
  }

  try {
    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
  } catch {
    throw Error;
  }
};

export const getAcceptedCollaborations = async (
  page = 0,
  size = 10,
): Promise<Collaborations[]> => {
  const url = `${BASE_URL}/supports/collaborations/accepted`;
  const API_TOKEN = localStorage.getItem('accessToken');

  if (!API_TOKEN) {
    window.location.href = 'login/individual';
  }

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
      params: { page, size },
    });

    return response.data?.data?.content ?? [];
  } catch {
    throw Error;
  }
};

export const getRejectedCollaborations = async (
  page = 0,
  size = 10,
): Promise<Collaborations[]> => {
  const url = `${BASE_URL}/supports/collaborations/rejected`;
  const API_TOKEN = localStorage.getItem('accessToken');

  if (!API_TOKEN) {
    window.location.href = 'login/individual';
  }

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
      params: { page, size },
    });

    return response.data?.data?.content ?? [];
  } catch {
    throw Error();
  }
};

export const deleteRejectedCollaborations = async (
  collectionGatheringId: number,
): Promise<void> => {
  const url = `${BASE_URL}/supports/collaborations/${collectionGatheringId}`;
  const API_TOKEN = localStorage.getItem('accessToken');

  if (!API_TOKEN) {
    window.location.href = 'login/individual';
  }

  try {
    await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    });
  } catch {
    throw Error;
  }
};
