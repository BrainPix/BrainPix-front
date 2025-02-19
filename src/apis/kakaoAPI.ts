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
    return;
  }

  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
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
    }
  } catch {
    return Error;
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
    throw Error;
  }

  if (!pgToken) {
    throw Error;
  }

  if (!orderId) {
    throw Error;
  }

  const requestData = { pgToken, orderId, ideaId };

  return axios
    .post(`${BASE_URL}/kakao-pay/approve`, requestData, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    })
    .then((response) => response.data)
    .catch(() => Error);
};
