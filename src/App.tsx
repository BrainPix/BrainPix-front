import { Test } from './pages/test/Test';
import { Layout } from './pages/layout/Layout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path='/'
            element={<Test />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
