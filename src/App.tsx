import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Test } from './pages/test/Test';
import { Layout } from './pages/layout/Layout';
import { MyPageLayout } from './pages/layout/MyPageLayout';
import { IdeaMarketMain } from './pages/idea-market/IdeaMarketMain';
import { IdeaMarketPayment } from './pages/idea-market/IdeaMarketPayment';
import { IdeaMarketRegister } from './pages/idea-market/IdeaMarketRegister';
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
import { MyPage } from './pages/my-page/myPage/MyPage';
import { Info } from './pages/my-page/info/Info';
import { RecentNews } from './pages/my-page/myPage/RecentNews';
import { Portfolio } from './pages/my-page/portfolio/Portfolio';
import { MyPagePosts } from './pages/my-page/myPagePosts/MyPagePosts';

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
            element={<IdeaMarketMain />}
          />
          <Route
            path='/idea-market/register'
            element={<IdeaMarketRegister />}
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
              element={<MyPage />}
            />
            <Route
              path='/my/info'
              element={<Info />}
            />
            <Route
              path='/my/recent-news'
              element={<RecentNews />}
            />
            <Route
              path='/my/posts' // 마이페이지 - 게시물 관리 페이지로 임시 라우팅
              element={<MyPagePosts />}
            />
            <Route
              path='/my/portfolio'
              element={<Portfolio />}
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
