import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/profile`;

export const getProfilePersonal = async () => {
  const token = localStorage.getItem('accessToken');
  const url = `${BASE_URL}/individual`;

  if (token) {
    const { data } = await axios(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (data.success) {
      return data.data;
    }
  }

  throw Error;
};

export const getProfileCompany = async () => {
  const token = localStorage.getItem('accessToken');
  const url = `${BASE_URL}/company`;

  if (token) {
    const { data } = await axios(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (data.success) {
      return data.data;
    }
  }

  throw Error;
};
