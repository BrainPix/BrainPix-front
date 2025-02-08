import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getIdeaMarketDetail = async (ideaId: number) => {
  const token = localStorage.getItem('accessToken');
  const url = `${BASE_URL}/idea-markets/${ideaId}`;
  //const response = await axios.get<{ data: IdeaMarketDetail }>(url);

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
  //const response = await axios.get<{ data: RequsetDetail }>(url);

  if (token) {
    const { data } = await axios(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data.data;
  }
};
