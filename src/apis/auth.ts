import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface SignUpPayload {
  id: string;
  password: string;
  name: string;
  birthday: string;
  nickname: string;
  email: string;
}

export const postSignUp = async (payload: SignUpPayload) => {
  const url = `${BASE_URL}/users/signup/personal`;
  const response = await axios.post(url, payload);
  return response;
};
