import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getMyIdeas = async (page: number) => {
  const token = localStorage.getItem('accessToken');
  const url = `${BASE_URL}/post-management/idea-market?page=${page}&size=3`;

  if (token) {
    const { data } = await axios(url, {
      headers: { Authorization: token },
    });
    return data;
  }
};
