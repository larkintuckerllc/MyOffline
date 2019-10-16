import { ApolloProvider } from '@apollo/react-hooks';
import React, { FC } from 'react';
import client from '../graphql/client';
import Books from './Books';

const App: FC = () => (
  <ApolloProvider client={client}>
    <Books />
  </ApolloProvider>
);

export default App;
