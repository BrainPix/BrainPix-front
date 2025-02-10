import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getComments, postComment } from '../apis/commentsAPI';
import { CommentsResponse, Comment } from '../types/commentsType';
import { useState } from 'react';

export const useQnA = (postId: number) => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(0);

  // 🔹 댓글 목록 조회 (useQuery)
  const commentsQuery = useQuery<CommentsResponse, Error>({
    queryKey: ['comments', postId, currentPage], // 🔹 페이지도 key에 추가
    queryFn: async () => await getComments(postId, currentPage), // 🔹 page 값 전달
    enabled: !!postId,
    staleTime: 1000 * 60 * 5, // 5분
  });

  // 🔹 댓글 작성 (useMutation + 낙관적 업데이트 적용)
  const postCommentMutation = useMutation({
    mutationFn: (content: string) => postComment(postId, content),
    onMutate: async (newComment) => {
      await queryClient.cancelQueries({ queryKey: ['comments', postId] });

      // 현재 댓글 데이터 가져오기
      const previousData = queryClient.getQueryData<CommentsResponse>([
        'comments',
        postId,
      ]);

      // 새로운 댓글 객체 생성 (임시로 UI에 추가)
      const optimisticComment: Comment = {
        commentId: Math.random(), // UI에서 임시 ID
        writerId: 0, // 백엔드에서 처리 후 정확한 ID 제공
        content: newComment,
        writerName: '나',
        createdDate: new Date().toISOString(),
        parentCommentId: null,
        childComments: [],
      };

      if (previousData) {
        queryClient.setQueryData(['comments', postId], {
          ...previousData,
          content: [optimisticComment, ...previousData.content], // UI에 즉시 반영
        });
      }

      return { previousData };
    },
    onSuccess: (data) => {
      console.log('📌 댓글 작성 응답 데이터:', data); // 🔹 POST 요청 후 서버 응답 확인
      queryClient.invalidateQueries({ queryKey: ['comments', postId] }); // 🔹 강제 새로고침
    },
    onError: (_error, _newComment, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['comments', postId], context.previousData); // 오류 발생 시 롤백
        setCurrentPage(0);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] }); // 서버 데이터 새로고침
    },
  });

  return { commentsQuery, postCommentMutation, setCurrentPage, currentPage };
};
