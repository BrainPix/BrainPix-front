import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Test } from './pages/test/Test';
import { Layout } from './pages/layout/Layout';
import { IdeaMarket } from './pages/idea-market/IdeaMarket';
import { RequestAssign } from './pages/request-assign/RequestAssign';
import { Collaboration } from './pages/collaboration/Collaboration';
import { Signup } from './pages/sign-up/Signup';

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
