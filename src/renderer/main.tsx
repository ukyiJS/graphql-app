import Loading from '@renderer/components/loading';
import { lazyMinLoadTime } from '@renderer/utils/lazyMinLoadTime';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import 'graphiql/graphiql.css';
import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import Modal from 'react-modal';
import './styles/index.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30000,
      suspense: true,
    },
  },
});

const App = lazyMinLoadTime(() => import('./pages/app'), 1500);

const rootElement = document.getElementById('root') as HTMLElement;
ReactDOM.createRoot(rootElement).render(
  <QueryClientProvider client={queryClient}>
    <Suspense fallback={<Loading />}>
      <App />
    </Suspense>
    <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
  </QueryClientProvider>,
);
Modal.setAppElement(rootElement);
