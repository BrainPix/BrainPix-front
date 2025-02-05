import { useQuery } from '@tanstack/react-query';
import { getIdeaMarketDetail } from '../apis/detailPageAPI';
import { IdeaMarketDetail } from '../types/detailPageType';
import { RequsetDetail } from '../types/detailPageType';
import { getRequestDetail } from '../apis/detailPageAPI';

export const useIdeaMarketDetail = (ideaId: number) => {
  return useQuery<IdeaMarketDetail, Error>({
    queryKey: ['ideaMarketDetail', ideaId],
    queryFn: () => getIdeaMarketDetail(ideaId),
    enabled: !!ideaId,
    staleTime: 1000 * 60 * 5, //5분
  });
};

export const useRequestDetail = (ideaId: number) => {
  return useQuery<RequsetDetail, Error>({
    queryKey: ['requsetDetaill', ideaId],
    queryFn: () => getRequestDetail(ideaId),
    enabled: !!ideaId,
    staleTime: 1000 * 60 * 5, //5분
  });
};
