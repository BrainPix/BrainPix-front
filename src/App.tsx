import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastProvider } from './contexts/toastContext';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <RouterProvider router={routes} />
      </ToastProvider>
    </QueryClientProvider>
  );
}

export default App;
