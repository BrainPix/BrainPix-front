import axios from 'axios';
import {
  ApplyRequestForCollaboration,
  ApplyRequestForRequest,
} from '../types/applyTypes';
import { checkAccessToken } from '../utils/checkAccessToken';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const applyForCollaboration = async (
  collaborationId: number,
  requestData: ApplyRequestForCollaboration,
) => {
  const token = checkAccessToken();
  if (!token) return null;

  try {
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
  } catch {
    throw Error;
  }
};

export const applyForRequest = async (
  taskId: number,
  requestData: ApplyRequestForRequest,
) => {
  const token = checkAccessToken();
  if (!token) return null;

  try {
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
  } catch {
    throw Error;
  }
};
