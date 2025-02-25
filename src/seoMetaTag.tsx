import { Helmet } from 'react-helmet-async';
import Logo from './assets/images/logoImage.png';

interface Props {
  title: string;
  description: string;
  keywords: string;
  image?: string;
  url: string;
}

export const MetaTag = (data: Props) => {
  const { title, description, keywords, image, url } = data;

  return (
    <Helmet>
      <title>{`BrainPIX ${title}`}</title>
      <link
        rel='icon'
        type='image/svg+xml'
        href='/src/assets/icons/logo.svg'
      />
      <meta
        name='keywords'
        content={keywords}
      />
      <meta
        name='description'
        content={description}
      />
      <meta
        property='og:type'
        content='website'
      />
      <meta
        property='og:title'
        content={title}
      />
      <meta
        property='og:site_name'
        content={title}
      />
      <meta
        property='og:description'
        content={description}
      />
      <meta
        property='og:image'
        content={image || Logo}
      />
      <meta
        property='og:image:width'
        content='250'
      />
      <meta
        property='og:image:height'
        content='200'
      />
      <meta
        property='og:url'
        content={url}
      />
    </Helmet>
  );
};
