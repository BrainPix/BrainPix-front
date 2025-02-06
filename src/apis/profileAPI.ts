import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/profile`;

export const getProfileIndividual = async () => {
  const token = localStorage.getItem('accessToken');
  const url = `${BASE_URL}/individual`;

  if (token) {
    const { data } = await axios(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  }
};
