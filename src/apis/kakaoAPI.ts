import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const kakaoPayReady = async ({
  ideaId,
  sellerId,
  quantity,
  totalPrice,
  vat,
}: {
  ideaId: number;
  sellerId: number;
  quantity: number;
  totalPrice: number;
  vat: number;
}) => {
  if (!ideaId) {
    console.error('ideaId가 존재하지 않습니다!');
    return;
  }

  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      console.error('토큰이 없습니다');
      return;
    }

    const response = await axios.post(
      `${BASE_URL}/kakao-pay/ready`,
      {
        ideaId,
        sellerId,
        quantity,
        totalPrice,
        vat,
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );

    if (response.data.success) {
      return {
        nextRedirectPcUrl: response.data.data.nextRedirectPcUrl,
        orderId: response.data.data.orderId ?? '',
      };
    } else {
      console.error('카카오페이 결제 요청 실패: 응답 실패 코드', response.data);
      return undefined;
    }
  } catch (error) {
    console.error('카카오페이 결제 요청 중 오류 발생:', error);
    return undefined;
  }
};

//결제 승인 API
export const kakaoPayApprove = async ({
  pgToken,
  orderId,
  ideaId,
}: {
  pgToken: string;
  orderId: string;
  ideaId: number;
}) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    console.error('access_token이 없습니다! 인증 오류 발생');
    throw new Error('인증 오류: 로그인 필요');
  }

  const requestData = { pgToken, orderId, ideaId };

  try {
    const response = await axios.post(
      `${BASE_URL}/kakao-pay/approve`,
      requestData,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      },
    );
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        '카카오페이 결제 승인 중 오류 발생:',
        error.response?.data || error.message,
      );
    } else {
      console.error('카카오페이 결제 승인 중 오류 발생:', error);
    }
    throw error;
  }
};
