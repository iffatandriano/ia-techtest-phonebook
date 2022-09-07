import '../styles/globals.css';
import 'antd/dist/antd.css';
import type { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import apolloClient from '../lib/apollo';
import { ContactProvider } from '../lib/context/useContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ContactProvider>
      <ApolloProvider client={apolloClient}>
        <Component {...pageProps} />;
      </ApolloProvider>
    </ContactProvider>
  );
}

export default MyApp;
