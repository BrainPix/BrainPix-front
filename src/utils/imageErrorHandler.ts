import { SyntheticEvent } from 'react';
import placeholderImage from './../assets/images/brainPixIcon.png';

export const imageErrorHandler = (e: SyntheticEvent<HTMLImageElement>) => {
  return (e.currentTarget.src = placeholderImage);
};
