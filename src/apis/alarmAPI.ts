import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_BASE_URL}`;

export const getAlarms = async () => {
  const token = localStorage.getItem('accessToken');
  const url = `${BASE_URL}/alarm`;

  if (token) {
    const { data } = await axios(url, {
      headers: {
        Authorization: `${token}`,
      },
    });

    return data;
  }
};
