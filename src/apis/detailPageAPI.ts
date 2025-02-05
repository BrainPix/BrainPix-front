import axios from 'axios';
import { IdeaMarketDetail } from '../types/detailPageType';
import { RequsetDetail } from '../types/detailPageType';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getIdeaMarketDetail = async (
  ideaId: number,
): Promise<IdeaMarketDetail> => {
  const url = `${BASE_URL}/idea-markets/${ideaId}`;
  const response = await axios.get<{ data: IdeaMarketDetail }>(url);
  return response.data.data;
};

export const getRequestDetail = async (
  ideaId: number,
): Promise<RequsetDetail> => {
  const url = `${BASE_URL}/idea-markets/${ideaId}`;
  const response = await axios.get<{ data: RequsetDetail }>(url);
  return response.data.data;
};
