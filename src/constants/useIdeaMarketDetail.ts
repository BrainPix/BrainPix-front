import { useQuery } from '@tanstack/react-query';
import { getIdeaMarketDetail } from '../apis/authAPI';
import { IdeaMarketDetail } from '../types/authType';

export const useIdeaMarketDetail = (ideaId: number) => {
  return useQuery<IdeaMarketDetail, Error>({
    queryKey: ['ideaMarketDetail', ideaId],
    queryFn: () => getIdeaMarketDetail(ideaId),
    enabled: !!ideaId,
    staleTime: 1000 * 60 * 5, //5분
  });
};
