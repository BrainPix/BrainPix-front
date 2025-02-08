import axios from 'axios';
import { Purchase } from '../types/purchaseType';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getPurchases = async (
  page = 0,
  size = 10,
): Promise<Purchase[]> => {
  const url = `${BASE_URL}/supports/idea-market/purchases`;

  const token = localStorage.getItem('token');

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: { page, size },
  });

  return response.data.data.content;
};
