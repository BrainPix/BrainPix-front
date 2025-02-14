import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './pages/layout/Layout';
import { IdeaMarketMain } from './pages/idea-market/IdeaMarketMain';
import { IdeaMarketRegister } from './pages/idea-market/IdeaMarketRegister';
import { IdeaRegisteredPage } from './pages/idea-market/IdeaRegisteredPage';
import { IdeaMarketPayment } from './pages/idea-market/IdeaMarketPayment';
import { RequestRegisteredPage } from './pages/request-assign/RequestRegisteredPage';
import { CollaborationMain } from './pages/collaboration/CollaborationMain';
import { PersonalProfile } from './pages/personal-profile/PersonalProfile';
import { PostDetailWithoutLink } from './pages/collaboration/PostDetailWithoutLink';
import { PostDetailWithLink } from './pages/collaboration/PostDetailWithLink';
import { MyPageLayout } from './pages/layout/MyPageLayout';
import { MyPage } from './pages/my-page/myPage/MyPage';
import { Info } from './pages/my-page/info/Info';
import { RecentNews } from './pages/my-page/myPage/RecentNews';
import { MyPagePosts } from './pages/my-page/myPagePosts/MyPagePosts';
import { PostsIdeaMarket } from './pages/my-page/postsIdeaMarket/PostsIdeaMarket';
import { PostsRequestAssign } from './pages/my-page/postsRequestAssign/PostsRequestAssign';
import { PostsCollaboration } from './pages/my-page/postsCollaboration/PostsCollaboration';
import { IdeaMarketEdit } from './pages/my-page/postsIdeaMarket/IdeaMarketEdit';
import { RequestAssignEdit } from './pages/my-page/postsRequestAssign/RequestAssignEdit';
import { CollaborationEdit } from './pages/my-page/postsCollaboration/CollaborationEdit';
import { RequestAssignRegister } from './pages/my-page/postsRequestAssign/RequestAssignRegister';
import { PurchaseList } from './pages/my-page/apply/PurchaseList';
import { ApplyRequest } from './pages/my-page/apply/ApplyRequest';
import { ApplyCollaboration } from './pages/my-page/apply/ApplyCollaboration';
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
    path: '/login',
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
    path: 'login/corporate',
    element: <Login userType='corporate' />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <IdeaMarketMain />,
      },
      {
        path: '/idea-market/register',
        element: <IdeaMarketRegister />,
      },
      {
        path: '/idea-market/registered/:ideaId',
        element: <IdeaRegisteredPage />,
      },
      {
        path: '/idea-market/payment',
        element: <IdeaMarketPayment />,
      },
      {
        path: '/request-assign/registered/:taskId',
        element: <RequestRegisteredPage />,
      },
      {
        path: 'collaboration',
        element: <CollaborationMain />,
      },
      {
        path: '/personal-profile/:id/:userType',
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
            path: '/my/posts/idea-market/:postId',
            element: <PostsIdeaMarket />,
          },
          {
            path: '/my/posts/request-assign/:postId',
            element: <PostsRequestAssign />,
          },
          {
            path: '/my/posts/collaboration/:postId',
            element: <PostsCollaboration />,
          },
          {
            path: '/my/posts/idea-market/edit/:postId',
            element: <IdeaMarketEdit />,
          },
          {
            path: '/my/posts/request-assign/edit/:postId',
            element: <RequestAssignEdit />,
          },
          {
            path: '/my/posts/request-assign/register/:postId',
            element: <RequestAssignRegister />,
          },
          {
            path: '/my/posts/collaboration/edit/:postId',
            element: <CollaborationEdit />,
          },
          {
            path: '/my/posts/request-assign/register/:postId',
            element: <RequestAssignRegister />,
          },
          {
            path: '/my/portfolio',
            element: <Portfolio />,
          },
          {
            path: '/my/apply-idea-market',
            element: <PurchaseList />,
          },
          {
            path: '/my/apply-request',
            element: <ApplyRequest />,
          },
          {
            path: '/my/apply-collaboration',
            element: <ApplyCollaboration />,
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
