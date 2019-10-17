import { ApolloProvider } from '@apollo/react-hooks';
import React, { FC } from 'react';
import client from '../../graphql/client';
import AppBooks from './AppBooks';
import AppBooksCreate from './AppBooksCreate';

const App: FC = () => (
  <ApolloProvider client={client}>
    <AppBooksCreate />
    <AppBooks />
  </ApolloProvider>
);

export default App;
