import axios from 'axios';
import {
  IndividualInfoPayloadType,
  putCompanyInfoPayload,
} from '../types/myPageType';
import { checkAccessToken } from '../utils/checkAccessToken';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getMyBasicInfo = async () => {
  const token = checkAccessToken();
  if (!token) return null;

  const url = `${BASE_URL}/my-page`;

  try {
    const { data } = await axios(url, {
      headers: { Authorization: token },
    });
    return data;
  } catch {
    throw Error;
  }
};

export const putIndividualInfo = async (
  userId: number,
  payload: IndividualInfoPayloadType,
) => {
  const token = checkAccessToken();
  if (!token) return null;

  const url = `${BASE_URL}/profile/individual/${userId}`;

  try {
    const { data } = await axios.put(url, payload, {
      headers: { Authorization: token },
    });
    return data;
  } catch {
    throw Error;
  }
};

export const putCompanyInfo = async (
  userId: number,
  payload: putCompanyInfoPayload,
) => {
  const token = checkAccessToken();
  if (!token) return null;

  const url = `${BASE_URL}/profile/company/${userId}`;

  try {
    const { data } = await axios.put(url, payload, {
      headers: { Authorization: token },
    });
    return data;
  } catch {
    throw Error;
  }
};
