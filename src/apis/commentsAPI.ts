import axios from 'axios';
import { CommentsResponse } from '../types/commentsType';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const getComments = async (
  postId: number,
  page: number,
  size: number = 10,
): Promise<CommentsResponse> => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    throw new Error('로그인이 필요합니다.');
  }

  const { data } = await axios.get<{ data: CommentsResponse }>(
    `${BASE_URL}/posts/${postId}/comments`,
    {
      params: { page, size },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return data.data;
};

export const postComment = async (
  postId: number,
  content: string,
  parentCommentId?: number,
) => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    throw new Error('로그인이 필요합니다.');
  }

  const requestBody = { content, parentCommentId: parentCommentId ?? null };

  const { data } = await axios.post(
    `${BASE_URL}/posts/${postId}/comments`,
    requestBody,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    },
  );

  return data;
};

export const postReply = async (
  postId: number,
  parentCommentId: number,
  content: string,
) => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    throw new Error('로그인이 필요합니다.');
  }

  const requestBody = { content };

  try {
    const { data } = await axios.post(
      `${BASE_URL}/posts/${postId}/comments/${parentCommentId}/reply`,
      requestBody,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      },
    );

    return data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        ' [postReply]  API 요청 실패:',
        error.response?.data || error,
      );
      alert(error.response?.data?.message || '대댓글 작성에 실패했습니다.');
    } else {
      console.error(' [postReply]  예기치 않은 오류 발생:', error);
      alert('알 수 없는 오류가 발생했습니다.');
    }
    throw error;
  }
};

export const deleteComment = async (postId: number, commentId: number) => {
  const token = localStorage.getItem('accessToken');

  if (!token) throw new Error('Access Token이 없습니다.');

  try {
    const { data } = await axios.delete(
      `${BASE_URL}/posts/${postId}/comments/${commentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return {
      success: true,
      message: `댓글 삭제 성공: commentId=${commentId}`,
      data,
    };
  } catch (error: unknown) {
    let errorMessage = '댓글 삭제에 실패했습니다.';

    if (axios.isAxiosError(error)) {
      console.error(`댓글 삭제 실패:`, error.response?.data || error);
      errorMessage = error.response?.data?.message || errorMessage;
    } else {
      console.error(`오류:`, error);
    }

    throw new Error(errorMessage);
  }
};
