import axios from 'axios';
import { checkAccessToken } from '../utils/checkAccessToken';

const BASE_URL = `${import.meta.env.VITE_BASE_URL}`;

export const getProfilePersonal = async () => {
  const token = checkAccessToken();
  if (!token) return null;

  const url = `${BASE_URL}/profile/individual`;

  try {
    const { data } = await axios(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (data.success) {
      return data.data;
    }
  } catch {
    throw Error;
  }
};

export const getProfileCompany = async () => {
  const token = checkAccessToken();
  if (!token) return null;

  const url = `${BASE_URL}/profile/company`;

  try {
    const { data } = await axios(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (data.success) {
      return data.data;
    }
  } catch {
    throw Error;
  }
};

export const getOtherProfilePersonal = async (userId: number) => {
  const token = checkAccessToken();
  if (!token) return null;

  const url = `${BASE_URL}/public-profile/individual/${userId}`;

  try {
    const { data } = await axios(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (data.success) {
      return data.data;
    }
  } catch {
    throw Error;
  }
};

export const getOtherProfileCompany = async (userId: number) => {
  const token = checkAccessToken();
  if (!token) return null;

  const url = `${BASE_URL}/public-profile/company/${userId}`;

  try {
    const { data } = await axios(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (data.success) {
      return data.data;
    }
  } catch {
    throw Error;
  }
};

export const getOtherProfilePosts = async (page: number, userId: number) => {
  const token = checkAccessToken();
  if (!token) return null;

  const url = `${BASE_URL}/public-profile/${userId}?page=${page}&size=4`;

  try {
    const { data } = await axios(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (data.success) {
      return data.data;
    }
  } catch {
    throw Error;
  }
};
