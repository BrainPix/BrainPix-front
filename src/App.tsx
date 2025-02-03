import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={routes}></RouterProvider>;
    </QueryClientProvider>
  );
}

export default App;
