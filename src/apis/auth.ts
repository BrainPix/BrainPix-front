import axios from 'axios';
import { LoginPayload, PersonalSignUpPayload } from '../types/auth';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const postLogin = async (payload: LoginPayload) => {
  const url = `${BASE_URL}/users/login?userId=${payload.id}`;
  const response = await axios.post(url, payload);
  console.log(response);
  return response;
};

export const postPersonalSignUp = async (payload: PersonalSignUpPayload) => {
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
  return response;
};

export const getDuplicateId = async (id: string) => {
  const url = `${BASE_URL}/users/signup/duplicate/id?id=${id}`;
  const response = await axios.get(url);
  return response;
};
