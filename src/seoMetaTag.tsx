import { Helmet } from 'react-helmet-async';

export const MetaTag = () => {
  return (
    <Helmet>
      <title>BrainPIX 아이디어 거래 & 협업 플랫폼</title>
      <link
        rel='icon'
        type='image/svg+xml'
        href='/src/assets/icons/logo.svg'
      />
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1.0'
      />
      <meta
        name='keywords'
        content='브레인픽스, brainpix, 아이디어 거래, 협업'
      />
      <meta
        name='description'
        content='BrainPIX에서 누구나 자신의 아이디어를 거래하고, 딱 맞는 협력자를 찾아요.'
      />
      <meta
        property='og:type'
        content='website'
      />
      <meta
        property='og:name'
        content='BrainPIX'
      />
      <meta
        property='og:image'
        content='/src/assets/icons/logo.svg'
      />
      <meta
        property='og:image:width'
        content='250'
      />
      <meta
        property='og:image:height'
        content='100'
      />
      <meta
        property='og:locale'
        content='ko_KR'
      />
    </Helmet>
  );
};
