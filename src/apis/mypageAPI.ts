import axios from 'axios';
import { IndividualInfoPayloadType } from '../types/myPageType';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getMyBasicInfo = async () => {
  const token = localStorage.getItem('accessToken');
  const url = `${BASE_URL}/my-page`;

  if (token) {
    const { data } = await axios(url, {
      headers: { Authorization: token },
    });
    return data;
  }
};

export const putIndividualInfo = async (
  userId: number,
  payload: IndividualInfoPayloadType,
) => {
  const token = localStorage.getItem('accessToken');
  const url = `${BASE_URL}/profile/individual/${userId}`;

  if (token) {
    const { data } = await axios.put(url, payload, {
      headers: { Authorization: token },
    });
    return data;
  }
};
