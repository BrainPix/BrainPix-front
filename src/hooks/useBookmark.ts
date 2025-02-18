import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postSavedPosts } from '../apis/savePostsAPI';
import {
  IdeaMarket,
  RequestTask,
  Collaboration,
  PostApiResponse,
} from '../types/postDataType';

export const useBookmark = () => {
  const [bookmarkedPosts, setBookmarkedPosts] = useState<Set<number>>(
    new Set(),
  );
  const queryClient = useQueryClient();

  const { mutate: toggleBookmark } = useMutation({
    mutationFn: postSavedPosts,
    onMutate: async (postId: number) => {
      setBookmarkedPosts((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(postId)) {
          newSet.delete(postId); // 북마크 해제
        } else {
          newSet.add(postId); // 북마크 추가
        }
        return newSet;
      });
      queryClient.setQueryData<
        PostApiResponse<IdeaMarket | RequestTask | Collaboration>
      >(['savedPosts'], (oldData) => {
        if (!oldData || !oldData.content) return oldData;

        return {
          ...oldData,
          content: oldData.content.filter((post) => post.ideaId !== postId),
        };
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['savedPosts'] });
    },
    onError: (error: unknown) => {
      if (error instanceof Error) {
        console.error('북마크 저장/해제 실패:', error.message);
      } else {
        console.error('북마크 저장/해제 실패: 알 수 없는 오류', error);
      }
    },
  });

  return { bookmarkedPosts, toggleBookmark };
};
