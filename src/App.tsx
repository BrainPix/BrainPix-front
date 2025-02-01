import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Test } from './pages/test/Test';
import { Layout } from './pages/layout/Layout';
import { MyPageLayout } from './pages/layout/MyPageLayout';
import { IdeaMarket } from './pages/idea-market/IdeaMarket';
import { IdeaMarketPayment } from './pages/idea-market/IdeaMarketPayment';
import { IdeaRegisteredPage } from './pages/idea-market/IdeaRegisteredPage';
import { RequestAssign } from './pages/request-assign/RequestAssign';
import { RequestRegisteredPage } from './pages/request-assign/RequestRegisteredPage';
import { Collaboration } from './pages/collaboration/Collaboration';
import { PostDetailWithoutLink } from './pages/collaboration/PostDetailWithoutLink';
import { PostDetailWithLink } from './pages/collaboration/PostDetailWithLink';
import { Signup } from './pages/sign-up/Signup';
import { IndividualMember } from './pages/sign-up/individual/IndividualMember';
import { CorporateMember } from './pages/sign-up/corporate/CorporateMember';
import { CompleteSignup } from './components/sign-up/CompleteSignup';
import { Login } from './pages/login/Login';
import { PersonalProfile } from './pages/personal-profile/PersonalProfile';
import { MyPagePosts } from './pages/my-page/myPagePosts/MyPagePosts';
import { PostsIdeaMarket } from './pages/my-page/postsIdeaMarket/PostsIdeaMarket';
import { PostsRequestAssign } from './pages/my-page/postsRequestAssign/PostsRequestAssign';
import { PostsCollaboration } from './pages/my-page/postsCollaboration/PostsCollaboration';
//import { IdeaMarketEdit } from './pages/my-page/postsIdeaMarket/IdeaMarketEdit';
//import { RequestAssignEdit } from './pages/my-page/postsRequestAssign/RequestAssignEdit';
//import { CollaborationEdit } from './pages/my-page/postsCollaboration/CollaborationEdit';
import { RequestAssignRegister } from './pages/my-page/postsRequestAssign/RequestAssignRegister';
//import { MyPage } from './pages/my-page/myPage/MyPage';
import { Info } from './pages/my-page/info/Info';
import { RecentNews } from './pages/my-page/myPage/RecentNews';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path='/'
            element={<Test />}
          />
          <Route
            path='/idea-market'
            element={<IdeaMarket />}
          />
          <Route
            path='/idea-market/registered'
            element={<IdeaRegisteredPage />}
          />
          <Route
            path='/idea-market/payment'
            element={<IdeaMarketPayment />}
          />
          <Route
            path='/request-assign'
            element={<RequestAssign />}
          />
          <Route
            path='/request-assign/registered'
            element={<RequestRegisteredPage />}
          />
          <Route
            path='/collaboration'
            element={<Collaboration />}
          />
          <Route
            path='/personal-profile/:id'
            element={<PersonalProfile />}
          />
          <Route
            path='/collaboration/postdetailwithoutlink'
            element={<PostDetailWithoutLink />}
          />
          <Route
            path='/collaboration/postdetailwithlink'
            element={<PostDetailWithLink />}
          />
          <Route element={<MyPageLayout />}>
            <Route
              path='/my'
              element={<RequestAssignRegister />}
            />
            <Route
              path='/my/posts'
              element={<MyPagePosts />}
            />
            <Route
              path='/my/posts/idea-market/:postId'
              element={<PostsIdeaMarket />}
            />
            <Route
              path='/my/posts/request-assign/:postId'
              element={<PostsRequestAssign />}
            />
            <Route
              path='/my/posts/collaboration/:postId'
              element={<PostsCollaboration />}
            />
            <Route
              path='/my/info'
              element={<Info />}
            />
            <Route
              path='/my/recent-news'
              element={<RecentNews />}
            />
          </Route>
        </Route>
        <Route
          path='/sign-up'
          element={<Signup />}
        />
        <Route
          path='/sign-up/individual'
          element={<IndividualMember />}
        />
        <Route
          path='/sign-up/corporate'
          element={<CorporateMember />}
        />
        <Route
          path='/sign-up/complete'
          element={<CompleteSignup />}
        />
        <Route
          path='/login'
          element={<Login />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
