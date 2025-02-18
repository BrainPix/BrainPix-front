import axios from 'axios';

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/alarm`;

export const getAlarms = async (page: number) => {
  const token = localStorage.getItem('accessToken');
  const url = `${BASE_URL}?page=${page}&size=5`;

  if (token) {
    const { data } = await axios(url, {
      headers: {
        Authorization: `${token}`,
      },
    });

    return data?.data;
  }
};

export const patchReadAlarm = async (alarmId: string) => {
  const token = localStorage.getItem('accessToken');
  const url = `${BASE_URL}/read/${alarmId}`;

  if (token) {
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
  }
};

export const getTrashAlarm = async (page: number) => {
  const token = localStorage.getItem('accessToken');
  const url = `${BASE_URL}/trash?page=${page}&size=5&sort=''`;

  if (token) {
    const { data } = await axios(url, {
      headers: {
        Authorization: `${token}`,
      },
    });

    return data;
  }
};

export const patchTrashAlarm = async (alarmId: string) => {
  const token = localStorage.getItem('accessToken');
  const url = `${BASE_URL}/trash/${alarmId}`;

  if (token) {
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
  }
};

export const patchRestoreAlarm = async (alarmId: string) => {
  const token = localStorage.getItem('accessToken');
  const url = `${BASE_URL}/restore/${alarmId}`;

  if (token) {
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
  }
};

export const deleteAllAlarms = async () => {
  const token = localStorage.getItem('accessToken');
  const url = `${BASE_URL}/delete`;

  if (token) {
    const { data } = await axios.delete(url, {
      headers: {
        Authorization: `${token}`,
      },
    });

    return data;
  }
};

export const deleteAlarm = async (alarmId: string) => {
  const token = localStorage.getItem('accessToken');
  const url = `${BASE_URL}/delete/${alarmId}`;

  if (token) {
    const { data } = await axios.delete(url, {
      headers: {
        Authorization: `${token}`,
      },
    });

    return data;
  }
};
