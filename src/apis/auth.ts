import axios from 'axios';
import { SignUpPayload } from '../types/auth';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const postSignUp = async (payload: SignUpPayload) => {
  const url = `${BASE_URL}/users/signup/personal`;
  const response = await axios.post(url, payload);
  return response;
};

export const postEmailCode = async (email: string) => {
  const url = `${BASE_URL}/email/send-code?${email}`;
  const response = await axios.post(url, {});
  return response;
};

export const getDuplicateNickname = async (nickname: string) => {
  const url = `${BASE_URL}/users/signup/duplicate/nickname?nickName=${nickname}`;
  const response = await axios.get(url);
  console.log(response);
  return response;
};
