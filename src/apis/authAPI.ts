import axios from 'axios';
import {
  CompanySignUpPayload,
  LoginPayload,
  PersonalSignUpPayload,
} from '../types/authType';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const postLogin = async (payload: LoginPayload) => {
  const url = `${BASE_URL}/users/login`;

  const response = await axios.post(url, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
  if (response.status === 200) {
    console.log(response.headers);
    return response;
  }
};

export const postPersonalSignUp = async (payload: PersonalSignUpPayload) => {
  const url = `${BASE_URL}/users/signup/personal`;
  const response = await axios.post(url, payload);
  return response;
};

export const postCompanySignUp = async (payload: CompanySignUpPayload) => {
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
