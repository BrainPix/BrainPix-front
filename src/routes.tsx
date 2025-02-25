import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './pages/layout/Layout';
import { MyPageLayout } from './pages/layout/MyPageLayout';

/** 아이디어 마켓 */
const IdeaMarketMain = lazy(() => import('./pages/idea-market/IdeaMarketMain'));
const IdeaMarketMarketPlace = lazy(
  () => import('./pages/idea-market/IdeaMarketMarketPlace'),
);
const IdeaMarketRegister = lazy(
  () => import('./pages/idea-market/IdeaMarketRegister'),
);
const IdeaMarketRegisterComplete = lazy(
  () => import('./pages/idea-market/IdeaMarketRegisterComplete'),
);
const IdeaRegisteredPage = lazy(
  () => import('./pages/idea-market/IdeaRegisteredPage'),
);
const IdeaMarketPayment = lazy(
  () => import('./pages/idea-market/IdeaMarketPayment'),
);
const PaymentProcessing = lazy(
  () => import('./pages/idea-market/PaymentProcessing'),
);
const PaymentFail = lazy(() => import('./pages/idea-market/PaymentFail'));
const PaymentCancel = lazy(() => import('./pages/idea-market/PaymentCancel'));
const PaymentSuccess = lazy(() => import('./pages/idea-market/PaymentSuccess'));

/** 요청 과제 */
const RequestAssignTechZone = lazy(
  () => import('./pages/request-assign/RequestAssignTechZone'),
);
const RequestAssignRegisterNow = lazy(
  () => import('./pages/request-assign/RequestAssignRegister'),
);
const RequestAssignRegisterComplete = lazy(
  () => import('./pages/request-assign/RequestAssignRegisterComplete'),
);
const RequestRegisteredPage = lazy(
  () => import('./pages/request-assign/RequestRegisteredPage'),
);
const RequestAssignMain = lazy(
  () => import('./pages/request-assign/RequestAssignMain'),
);

/** 협업 광장 */
const CollaborationMain = lazy(
  () => import('./pages/collaboration/CollaborationMain'),
);
const PostDetailWithLink = lazy(
  () => import('./pages/collaboration/PostDetailWithLink'),
);
const CollaborationRegister = lazy(
  () => import('./pages/collaboration/CollaborationRegister'),
);

/** 마이페이지 */
const PostsIdeaMarket = lazy(
  () => import('./pages/my-page/postsIdeaMarket/PostsIdeaMarket'),
);
const Info = lazy(() => import('./pages/my-page/info/Info'));
const MyPage = lazy(() => import('./pages/my-page/myPage/MyPage'));
const RecentNews = lazy(() => import('./pages/my-page/myPage/RecentNews'));
const MyPagePosts = lazy(
  () => import('./pages/my-page/myPagePosts/MyPagePosts'),
);
const PostsRequestAssign = lazy(
  () => import('./pages/my-page/postsRequestAssign/PostsRequestAssign'),
);
const PostsCollaboration = lazy(
  () => import('./pages/my-page/postsCollaboration/PostsCollaboration'),
);
const IdeaMarketRegistered = lazy(
  () => import('./pages/my-page/postsIdeaMarket/IdeaMarketRegistered'),
);
const RequestAssignRegistered = lazy(
  () => import('./pages/my-page/postsRequestAssign/RequestAssignRegistered'),
);
const CollaborationRegistered = lazy(
  () => import('./pages/my-page/postsCollaboration/CollaborationRegistered'),
);
const IdeaMarketEdit = lazy(
  () => import('./pages/my-page/postsIdeaMarket/IdeaMarketEdit'),
);
const PurchaseList = lazy(() => import('./pages/my-page/apply/PurchaseList'));
const ApplyRequest = lazy(() => import('./pages/my-page/apply/ApplyRequest'));
const ApplyCollaboration = lazy(
  () => import('./pages/my-page/apply/ApplyCollaboration'),
);
const Portfolio = lazy(() => import('./pages/my-page/portfolio/Portfolio'));
const Message = lazy(() => import('./pages/my-page/message/Message'));
const SavedPosts = lazy(() => import('./pages/my-page/saved-posts/SavedPosts'));

/**  */
const PersonalProfile = lazy(
  () => import('./pages/personal-profile/PersonalProfile'),
);
const Main = lazy(() => import('./pages/main/main'));
const Signup = lazy(() => import('./pages/sign-up/Signup'));
const Login = lazy(() => import('./pages/login/Login'));
const ErrorPage = lazy(() => import('./pages/errorPage/ErrorPage'));

export const routes = createBrowserRouter([
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
        path: '/idea-market',
        element: <IdeaMarketMain />,
      },
      {
        path: '/idea-market/market-place',
        element: <IdeaMarketMarketPlace />,
      },
      {
        path: '/idea-market/register',
        element: <IdeaMarketRegister />,
      },
      {
        path: '/idea-market/register-complete',
        element: <IdeaMarketRegisterComplete />,
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
        path: '/request-assign',
        element: <RequestAssignMain />,
      },
      {
        path: '/request-assign/open-idea',
        element: <RequestAssignMain />,
      },
      {
        path: '/request-assign/tech-zone',
        element: <RequestAssignTechZone />,
      },
      {
        path: '/request-assign/register',
        element: <RequestAssignRegisterNow />,
      },
      {
        path: '/request-assign/register-complete',
        element: <RequestAssignRegisterComplete />,
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
        path: '/collaboration/register',
        element: <CollaborationRegister />,
      },
      {
        path: '/personal-profile/:id/:userType',
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
            path: '/my/posts/idea-market/:ideaId',
            element: <PostsIdeaMarket />,
          },
          {
            path: '/my/posts/request-assign/:taskId',
            element: <PostsRequestAssign />,
          },
          {
            path: '/my/posts/collaboration/:collaborationId',
            element: <PostsCollaboration />,
          },
          {
            path: '/my/posts/idea-market/registered/:ideaId',
            element: <IdeaMarketRegistered />,
          },
          {
            path: '/my/posts/request-assign/registered/:taskId',
            element: <RequestAssignRegistered />,
          },
          {
            path: '/my/posts/collaboration/registered/:collaborationId',
            element: <CollaborationRegistered />,
          },
          {
            path: '/my/posts/idea-market/edit/:ideaId',
            element: <IdeaMarketEdit />,
          },
          // {
          //   path: '/my/posts/request-assign/edit/:taskId',
          //   element: <RequestAssignEdit />,
          // },
          // {
          //   path: '/my/posts/collaboration/edit/:collaborationId',
          //   element: <CollaborationEdit />,
          // },
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
          {
            path: '/my/save',
            element: <SavedPosts />,
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
