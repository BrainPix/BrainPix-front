import axios from 'axios';
import {
  CompanySignUpPayload,
  EmailCodePayload,
  LoginPayload,
  PersonalSignUpPayload,
} from '../types/authType';

const BASE_URL = `${import.meta.env.VITE_BASE_URL}/users`;

export const postLogin = async (payload: LoginPayload) => {
  const url = `${BASE_URL}/login`;

  const response = await axios.post(url, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  if (response.status === 200) {
    const { data } = response;
    return data;
  }
};

export const postPersonalSignUp = async (payload: PersonalSignUpPayload) => {
  const url = `${BASE_URL}/signup/personal`;
  const response = await axios.post(url, payload);
  return response;
};

export const postCompanySignUp = async (payload: CompanySignUpPayload) => {
  const url = `${BASE_URL}/signup/company`;
  const response = await axios.post(url, payload);
  return response;
};

export const postEmailCode = async (email: string) => {
  const url = `${BASE_URL}/login/email`;
  const response = await axios.post(url, { email });
  return response;
};

export const postEmailCodeNumber = async (payload: EmailCodePayload) => {
  const url = `${BASE_URL}/login/email/auth`;
  const { data } = await axios.post(url, payload);
  return data;
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
