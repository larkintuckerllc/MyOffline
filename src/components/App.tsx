import { ApolloProvider } from '@apollo/react-hooks';
import React, { FC } from 'react';
import client from '../graphql/client';
import Books from './Books';
import BooksCreate from './BooksCreate';

const App: FC = () => (
  <ApolloProvider client={client}>
    <BooksCreate />
    <Books />
  </ApolloProvider>
);

export default App;
