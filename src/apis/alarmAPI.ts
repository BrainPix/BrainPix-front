import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_BASE_URL}`;

export const getAlarms = async (page: number) => {
  const token = localStorage.getItem('accessToken');
  const url = `${BASE_URL}/alarm?page${page}&size=5`;

  if (token) {
    const { data } = await axios(url, {
      headers: {
        Authorization: `${token}`,
      },
    });

    return data;
  }
};
