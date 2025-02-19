import axios from 'axios';
import { checkAccessToken } from '../utils/checkAccessToken';

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/alarm`;

export const getAlarms = async (page: number) => {
  const token = checkAccessToken();
  if (!token) return null;

  const url = `${BASE_URL}?page=${page}&size=5`;

  try {
    const { data } = await axios(url, {
      headers: {
        Authorization: `${token}`,
      },
    });

    return data?.data;
  } catch {
    throw Error;
  }
};

export const patchReadAlarm = async (alarmId: string) => {
  const token = checkAccessToken();
  if (!token) return null;

  const url = `${BASE_URL}/read/${alarmId}`;

  try {
    const { data } = await axios.patch(
      url,
      {},
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );

    return data;
  } catch {
    throw Error;
  }
};

export const getTrashAlarm = async (page: number) => {
  const token = checkAccessToken();
  if (!token) return null;

  const url = `${BASE_URL}/trash?page=${page}&size=5&sort=''`;

  try {
    const { data } = await axios(url, {
      headers: {
        Authorization: `${token}`,
      },
    });

    return data;
  } catch {
    throw Error;
  }
};

export const patchTrashAlarm = async (alarmId: string) => {
  const token = checkAccessToken();
  if (!token) return null;

  const url = `${BASE_URL}/trash/${alarmId}`;

  try {
    const { data } = await axios.patch(
      url,
      {},
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );

    return data;
  } catch {
    throw Error;
  }
};

export const patchRestoreAlarm = async (alarmId: string) => {
  const token = checkAccessToken();
  if (!token) return null;

  const url = `${BASE_URL}/restore/${alarmId}`;

  try {
    const { data } = await axios.patch(
      url,
      {},
      {
        headers: {
          Authorization: `${token}`,
        },
      },
    );

    return data;
  } catch {
    throw Error;
  }
};

export const deleteAllAlarms = async () => {
  const token = checkAccessToken();
  if (!token) return null;

  const url = `${BASE_URL}/delete`;

  try {
    const { data } = await axios.delete(url, {
      headers: {
        Authorization: `${token}`,
      },
    });

    return data;
  } catch {
    throw Error;
  }
};

export const deleteAlarm = async (alarmId: string) => {
  const token = checkAccessToken();
  if (!token) return null;

  const url = `${BASE_URL}/delete/${alarmId}`;

  try {
    const { data } = await axios.delete(url, {
      headers: {
        Authorization: `${token}`,
      },
    });

    return data;
  } catch {
    throw Error;
  }
};
