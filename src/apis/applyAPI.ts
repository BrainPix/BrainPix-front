import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface ApplyRequestForCollaboration {
  collaborationRecruitmentId: number;
  isOpenProfile: boolean;
  message: string;
}

export const applyForCollaboration = async (
  collaborationId: number,
  requestData: ApplyRequestForCollaboration,
) => {
  const token = localStorage.getItem('accessToken');

  if (!token) {
    throw new Error('로그인이 필요합니다.');
  }

  console.log('최종 API 요청 데이터:', requestData);

  const { data } = await axios.post(
    `${BASE_URL}/collaborations/${collaborationId}/apply`,
    requestData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      transformRequest: [(data) => JSON.stringify(data)],
    },
  );

  return data;
};
