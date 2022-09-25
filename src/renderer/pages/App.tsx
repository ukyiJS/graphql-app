import { createGraphiQLFetcher } from '@graphiql/toolkit';
import UrlInputModal from '@renderer/components/urlInputModal';
import { useQuery } from '@tanstack/react-query';
import { GraphiQL } from 'graphiql';

export default function App() {
  const { data: [history] = [] } = useQuery(['history'], async (): Promise<string[]> => window.app.invoke<string[]>('get-history'));
  const fetcher = createGraphiQLFetcher({ url: history ?? 'https://localhost:3000' });
  return (
    <>
      <UrlInputModal />
      <GraphiQL fetcher={fetcher} />
    </>
  );
}
