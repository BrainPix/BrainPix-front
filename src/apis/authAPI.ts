import axios from 'axios';
import {
  CompanySignUpPayload,
  LoginPayload,
  PersonalSignUpPayload,
} from '../types/authType';

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/users`;

export const postLogin = async (payload: LoginPayload) => {
  const url = `${BASE_URL}/login?userId=${payload.id}`;
  const response = await axios.post(url, payload);
  return response;
};

export const postPersonalSignUp = async (payload: PersonalSignUpPayload) => {
  const url = `${BASE_URL}/signup/personal`;
  const response = await axios.post(url, payload);
  return response;
};

export const postCompanySignUp = async (payload: CompanySignUpPayload) => {
  const url = `${BASE_URL}/signup/personal`;
  const response = await axios.post(url, payload);
  return response;
};

export const postEmailCode = async (email: string) => {
  const url = `${BASE_URL}/email/send-code?${email}`;
  const response = await axios.post(url, {});
  return response;
};

export const getDuplicateNickname = async (nickname: string) => {
  const url = `${BASE_URL}/signup/duplicate/nickname?nickName=${nickname}`;
  const response = await axios.get(url);
  return response;
};

export const getDuplicateId = async (id: string) => {
  const url = `${BASE_URL}/signup/duplicate/id?id=${id}`;
  const response = await axios.get(url);
  return response;
};
