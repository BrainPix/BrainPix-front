import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getMyPorfolio = async (page: number) => {
  const token = localStorage.getItem('accessToken');
  const url = `${BASE_URL}/portfolios?page=${page}&size=8`;

  if (token) {
    const { data } = await axios(url, {
      headers: { Authorization: token },
    });
    return data;
  }
};
