export const parseJwt = (token: string) => {
  try {
    const base64Url = token.split('.')[1]; // JWT의 Payload
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); // Base64 URL Safe 복원
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
        .join(''),
    );
    return JSON.parse(jsonPayload); // JSON 객체로 변환
  } catch {
    throw Error();
  }
};

export const getUserIdFromToken = () => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) return null;

  const decodedToken = parseJwt(accessToken);
  return decodedToken?.userId || decodedToken?.id || null;
};
