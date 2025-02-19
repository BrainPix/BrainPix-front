import { SyntheticEvent } from 'react';
import placeholderImage from './../assets/images/placeholderImage.png';

export const imageErrorHandler = (e: SyntheticEvent<HTMLImageElement>) => {
  return (e.currentTarget.src = placeholderImage);
};
