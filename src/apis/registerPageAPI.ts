import axios from 'axios';
import {
  IndividualInfoPayloadType,
  putCompanyInfoPayload,
} from '../types/myPageType';
import { RequestAssignRegister } from '../types/requestAssignRegister';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const postRequest = async (RequestAssignRegister2: RequestAssignRegister) => {
  const token = localStorage.getItem('accessToken');
  const url = `${BASE_URL}/request-tasks`;

  if (token) {
    const { data } = await axios.post(url, RequestAssignRegister2, {
      headers: { Authorization: token },
    });
    return data;
  }
};
