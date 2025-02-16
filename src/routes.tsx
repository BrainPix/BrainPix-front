import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './pages/layout/Layout';
import { IdeaMarketMain } from './pages/idea-market/IdeaMarketMain';
import { IdeaMarketRegister } from './pages/idea-market/IdeaMarketRegister';
import { IdeaRegisteredPage } from './pages/idea-market/IdeaRegisteredPage';
import { IdeaMarketPayment } from './pages/idea-market/IdeaMarketPayment';
import { PaymentProcessing } from './pages/idea-market/PaymentProcessing';
import { PaymentFail } from './pages/idea-market/PaymentFail';
import { PaymentCancel } from './pages/idea-market/PaymentCancel';
import { PaymentSuccess } from './pages/idea-market/PaymentSuccess';
import { RequestRegisteredPage } from './pages/request-assign/RequestRegisteredPage';
import { CollaborationMain } from './pages/collaboration/CollaborationMain';
import { PersonalProfile } from './pages/personal-profile/PersonalProfile';
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
import { ErrorPage } from './pages/ErrorPage';

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
    path: 'login/corporate',
    element: <Login userType='corporate' />,
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
        path: '/idea-market/registered/:ideaId',
        element: <IdeaRegisteredPage />,
      },
      {
        path: '/idea-market/payment/:ideaId',
        element: <IdeaMarketPayment />,
      },
      {
        path: '/purchase/approve',
        element: <PaymentProcessing />,
      },
      {
        path: '/idea-market/payment-fail',
        element: <PaymentFail />,
      },
      {
        path: '/idea-market/payment-cancel',
        element: <PaymentCancel />,
      },
      {
        path: '/idea-market/payment-success',
        element: <PaymentSuccess />,
      },
      {
        path: '/request-assign/registered/:taskId',
        element: <RequestRegisteredPage />,
      },
      {
        path: '/collaboration',
        element: <CollaborationMain />,
      },
      {
        path: '/personal-profile/:id',
        element: <PersonalProfile />,
      },
      {
        path: '/collaboration/postdetailwithlink/:collaborationId',
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
  {
    path: '*',
    element: <ErrorPage />,
  },
]);
