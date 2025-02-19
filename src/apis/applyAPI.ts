import axios from 'axios';
import {
  ApplyRequestForCollaboration,
  ApplyRequestForRequest,
} from '../types/applyTypes';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const applyForCollaboration = async (
  collaborationId: number,
  requestData: ApplyRequestForCollaboration,
) => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    throw new Error('로그인이 필요합니다.');
  }

  const { data } = await axios.post(
    `${BASE_URL}/collaborations/${collaborationId}/apply`,
    requestData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      transformRequest: [(data) => JSON.stringify(data)],
    },
  );

  return data;
};

export const applyForRequest = async (
  taskId: number,
  requestData: ApplyRequestForRequest,
) => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    throw new Error('로그인이 필요합니다.');
  }

  const { data } = await axios.post(
    `${BASE_URL}/request-tasks/${taskId}/apply`,
    requestData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      transformRequest: [(data) => JSON.stringify(data)],
    },
  );

  return data;
};
