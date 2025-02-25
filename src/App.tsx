import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastProvider } from './contexts/toastContext';
import { Suspense } from 'react';
import LoadingPage from './pages/loading/LoadingPage';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <ToastProvider>
        <Suspense fallback={<LoadingPage />}>
          <RouterProvider router={routes}></RouterProvider>;
        </Suspense>
      </ToastProvider>
    </QueryClientProvider>
  );
}

export default App;
