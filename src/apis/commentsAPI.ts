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
  } catch {
    throw Error;
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
  } catch {
    throw new Error('댓글 삭제에 실패했습니다.');
  }
};
