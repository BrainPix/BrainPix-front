import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

interface getPresignedPropsType {
  fileName: string;
  fileType: string;
}

export const getPresignedURL = async ({
  fileName,
  fileType,
}: getPresignedPropsType) => {
  const url = `${BASE_URL}/files/presigned-url`;

  const { data } = await axios.get(url, {
    params: { fileName: fileName, contentType: fileType },
  });

  return data;
};

export const puPresignedURL = async ({
  fileName,
  fileType,
}: getPresignedPropsType) => {
  const url = `${BASE_URL}/files/presigned-url`;

  const { data } = await axios.put(url, {
    params: { fileName: fileName, contentType: fileType },
  });

  return data;
};
