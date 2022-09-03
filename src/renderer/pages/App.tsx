import { createGraphiQLFetcher } from '@graphiql/toolkit';
import { GraphiQL } from 'graphiql';
import { useEffect } from 'react';
import 'graphiql/graphiql.css';

export default function App() {
  const fetcher = createGraphiQLFetcher({
    url: 'https://ytu-wine-api.netlify.app/v1/graphql',
  });

  useEffect(() => {
    window.app.invoke('send-msg', 'test message').then(message => console.log('send-msg', message));
  }, []);

  useEffect(() => {
    const replyId = window.app.on('reply-msg', message => console.log('### reply-msg', message));
    return () => window.app.off(replyId);
  }, []);

  return (<GraphiQL fetcher={fetcher} />);
}
