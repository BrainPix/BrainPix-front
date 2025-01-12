import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Test } from './pages/test/Test';
import { Layout } from './pages/layout/Layout';
import { IdeaMarket } from './pages/idea-market/IdeaMarket';
import IdeaMarketPayment from './pages/idea-market/IdeaMarketPayment/IdeaMarketPayment';
import { RequestAssign } from './pages/request-assign/RequestAssign';
import { Collaboration } from './pages/collaboration/Collaboration';
import { Signup } from './pages/sign-up/Signup';
import { IndividualMember } from './components/sign-up/IndividualMember';
import { CorporateMember } from './components/sign-up/CorporateMember';
import { CompleteSignup } from './components/sign-up/CompleteSignup';
import { Login } from './pages/login/Login';

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
