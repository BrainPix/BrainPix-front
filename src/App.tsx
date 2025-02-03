import { BrowserRouter, Route, Routes } from 'react-router-dom';
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
import { Main } from './pages/main/main';
import { Signup } from './pages/sign-up/Signup';
import { Login } from './pages/login/Login';
import { PersonalProfile } from './pages/personal-profile/PersonalProfile';
import { MyPage } from './pages/my-page/myPage/MyPage';
import { Info } from './pages/my-page/info/Info';
import { RecentNews } from './pages/my-page/myPage/RecentNews';
import { Portfolio } from './pages/my-page/portfolio/Portfolio';
import { Message } from './pages/my-page/message/Message';
import { MyPagePosts } from './pages/my-page/myPagePosts/MyPagePosts';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
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
            <Route
              path='/my/message'
              element={<Message />}
            />
          </Route>
        </Route>
        <Route
          path='/'
          element={<Main />}
        />
        <Route
          path='/sign-up'
          element={<Signup />}
        />
        <Route
          path='/login/individual'
          element={<Login userType='individual' />}
        />
        <Route
          path='/login/corparate'
          element={<Login userType='corparate' />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
