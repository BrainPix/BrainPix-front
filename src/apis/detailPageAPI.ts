import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getIdeaMarketDetail = async (ideaId: number) => {
  const token = localStorage.getItem('accessToken');
  const url = `${BASE_URL}/idea-markets/${ideaId}`;

  if (token) {
    const { data } = await axios(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data;
  }
};

export const getRequestDetail = async (taskId: number) => {
  const token = localStorage.getItem('accessToken');
  const url = `${BASE_URL}/request-tasks/${taskId}`;

  if (token) {
    const { data } = await axios(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data;
  }
};

export const getCollaborationDetail = async (collaborationId: number) => {
  const token = localStorage.getItem('accessToken');
  const url = `${BASE_URL}/collaborations/${collaborationId}`;

  if (token) {
    const { data } = await axios(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data;
  }
};
