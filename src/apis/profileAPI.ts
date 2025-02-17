import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_BASE_URL}`;

export const getProfilePersonal = async () => {
  const token = localStorage.getItem('accessToken');
  const url = `${BASE_URL}/profile/individual`;

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
  const url = `${BASE_URL}/profile/company`;

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

export const getOtherProfilePersonal = async (userId: number) => {
  const token = localStorage.getItem('accessToken');
  const url = `${BASE_URL}/public-profile/individual/${userId}`;

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

export const getOtherProfileCompany = async (userId: number) => {
  const token = localStorage.getItem('accessToken');
  const url = `${BASE_URL}/public-profile/company/${userId}`;

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

export const getOtherProfilePosts = async (page: number, userId: number) => {
  const token = localStorage.getItem('accessToken');
  const url = `${BASE_URL}/public-profile/${userId}?page=${page}&size=4`;

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
