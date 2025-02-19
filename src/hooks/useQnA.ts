import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  deleteComment,
  getComments,
  postComment,
  postReply,
} from '../apis/commentsAPI';
import { CommentsResponse, Comment } from '../types/commentsType';
import { useState } from 'react';

export const useQnA = (postId: number, _userId: number) => {
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(0);

  const commentsQuery = useQuery<CommentsResponse, Error>({
    queryKey: ['comments', postId, currentPage], // 페이지 추가
    queryFn: async () => await getComments(postId, currentPage),
    enabled: !!postId,
    staleTime: 1000 * 60 * 5, // 5분
  });
  const deleteCommentMutation = useMutation({
    mutationFn: ({ commentId }: { commentId: number }) =>
      deleteComment(postId, commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },
  });

  const postCommentMutation = useMutation({
    mutationFn: (content: string) => postComment(postId, content),
    onMutate: async (newComment) => {
      await queryClient.cancelQueries({ queryKey: ['comments', postId] });

      const previousData = queryClient.getQueryData<CommentsResponse>([
        'comments',
        postId,
      ]);

      //임시 댓글
      const optimisticComment: Comment = {
        commentId: Math.random(),
        writerId: 0,
        content: newComment,
        writerName: '나',
        createdDate: new Date().toISOString(),
        parentCommentId: null,
        childComments: [],
        profileImageUrl: 'string',
      };

      if (previousData) {
        queryClient.setQueryData(['comments', postId], {
          ...previousData,
          content: [optimisticComment, ...previousData.content],
        });
      }

      return { previousData };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      setCurrentPage(0);
    },
    onError: (_error, _newComment, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['comments', postId], context.previousData);
      }
    },
  });

  const postReplyMutation = useMutation({
    mutationFn: ({
      parentCommentId,
      content,
    }: {
      parentCommentId: number;
      content: string;
    }) => postReply(postId, parentCommentId, content),

    onMutate: async ({ parentCommentId, content }) => {
      await queryClient.cancelQueries({ queryKey: ['comments', postId] });

      const previousData = queryClient.getQueryData<CommentsResponse>([
        'comments',
        postId,
      ]);

      const optimisticReply: Comment = {
        commentId: Math.random(),
        writerId: 0,
        content,
        writerName: '나',
        createdDate: new Date().toISOString(),
        parentCommentId,
        childComments: [],
        profileImageUrl: 'string',
      };

      if (previousData) {
        const updatedComments = previousData.content.map((comment) =>
          comment.commentId === parentCommentId
            ? {
                ...comment,
                childComments: [...comment.childComments, optimisticReply],
              }
            : comment,
        );

        queryClient.setQueryData(['comments', postId], {
          ...previousData,
          content: updatedComments,
        });
      }

      return { previousData };
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', postId] });
    },

    onError: (_error, _newReply, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(['comments', postId], context.previousData);
      }
    },
  });

  return {
    commentsQuery,
    deleteCommentMutation,
    postCommentMutation,
    postReplyMutation,
    setCurrentPage,
    currentPage,
  };
};
