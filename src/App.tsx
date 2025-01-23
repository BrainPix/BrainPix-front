import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Test } from './pages/test/Test';
import { Layout } from './pages/layout/Layout';
import { MyPageLayout } from './pages/layout/MyPageLayout';
import { IdeaMarket } from './pages/idea-market/IdeaMarket';
import IdeaMarketPayment from './pages/idea-market/IdeaMarketPayment';
import { RequestAssign } from './pages/request-assign/RequestAssign';
import { Collaboration } from './pages/collaboration/Collaboration';
import PostDetailWithoutLink from './pages/collaboration/PostDetailWithoutLink';
import PostDetailWithLink from './pages/collaboration/PostDetailWithLink';
import { Signup } from './pages/sign-up/Signup';
import { IndividualMember } from './pages/sign-up/individual/IndividualMember';
import { CorporateMember } from './pages/sign-up/corporate/CorporateMember';
import { CompleteSignup } from './components/sign-up/CompleteSignup';
import { Login } from './pages/login/Login';
import { PersonalProfile } from './pages/personal-profile/PersonalProfile';
import { MyPage } from './pages/my/MyPage';

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
            path='/idea-market/payment'
            element={<IdeaMarketPayment />}
          />
          <Route
            path='/request-assign'
            element={<RequestAssign />}
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
