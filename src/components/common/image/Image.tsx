import { ImgHTMLAttributes } from 'react';
import { imageErrorHandler } from '../../../utils/imageErrorHandler';
import PlaceHolder from '../../../assets/images/placeholderImage.png';

interface ImagePropsType extends ImgHTMLAttributes<HTMLImageElement> {
  alt: string;
  src: string;
  className?: string;
}

export const Image = ({ alt, src, className, ...rest }: ImagePropsType) => {
  return (
    <img
      alt={alt}
      src={src || PlaceHolder}
      className={className}
      {...rest}
      onError={imageErrorHandler}
    />
  );
};
