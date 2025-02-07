import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './pages/layout/Layout';
import { IdeaMarketMain } from './pages/idea-market/IdeaMarketMain';
import { IdeaMarketRegister } from './pages/idea-market/IdeaMarketRegister';
import { IdeaRegisteredPage } from './pages/idea-market/IdeaRegisteredPage';
import { IdeaMarketPayment } from './pages/idea-market/IdeaMarketPayment';
import { RequestRegisteredPage } from './pages/request-assign/RequestRegisteredPage';
import { Collaboration } from './pages/collaboration/Collaboration';
import { PersonalProfile } from './pages/personal-profile/PersonalProfile';
import { PostDetailWithoutLink } from './pages/collaboration/PostDetailWithoutLink';
import { PostDetailWithLink } from './pages/collaboration/PostDetailWithLink';
import { MyPageLayout } from './pages/layout/MyPageLayout';
import { MyPage } from './pages/my-page/myPage/MyPage';
import { Info } from './pages/my-page/info/Info';
import { RecentNews } from './pages/my-page/myPage/RecentNews';
import { MyPagePosts } from './pages/my-page/myPagePosts/MyPagePosts';
import { Portfolio } from './pages/my-page/portfolio/Portfolio';
import { Message } from './pages/my-page/message/Message';
import { Main } from './pages/main/main';
import { Signup } from './pages/sign-up/Signup';
import { Login } from './pages/login/Login';
import { Test } from './pages/test/Test';

export const routes = createBrowserRouter([
  {
    path: '/test',
    element: <Test />,
  },
  {
    path: '/',
    element: <Main />,
  },
  {
    path: '/sign-up',
    element: <Signup />,
  },
  {
    path: '/login/personal',
    element: <Login userType='personal' />,
  },
  {
    path: 'login/corparate',
    element: <Login userType='corparate' />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/idea-market',
        element: <IdeaMarketMain />,
      },
      {
        path: '/idea-market/register',
        element: <IdeaMarketRegister />,
      },
      {
        path: '/idea-market/registered',
        element: <IdeaRegisteredPage />,
      },
      {
        path: '/idea-market/payment',
        element: <IdeaMarketPayment />,
      },
      {
        path: '/request-assign',
        element: <RequestRegisteredPage />,
      },
      {
        path: 'collaboration',
        element: <Collaboration />,
      },
      {
        path: '/personal-profile/:id',
        element: <PersonalProfile />,
      },
      {
        path: '/collaboration/postdetailwithoutlink',
        element: <PostDetailWithoutLink />,
      },
      {
        path: '/collaboration/postdetailwithlink',
        element: <PostDetailWithLink />,
      },
      {
        element: <MyPageLayout />,
        children: [
          {
            path: '/my',
            element: <MyPage />,
          },
          {
            path: '/my/info',
            element: <Info />,
          },
          {
            path: '/my/recent-news',
            element: <RecentNews />,
          },
          {
            path: '/my/posts',
            element: <MyPagePosts />,
          },
          {
            path: '/my/portfolio',
            element: <Portfolio />,
          },
          {
            path: '/my/message',
            element: <Message />,
          },
        ],
      },
    ],
  },
]);
