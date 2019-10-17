import { ApolloProvider } from '@apollo/react-hooks';
import React, { FC } from 'react';
import { Provider } from 'react-redux';
import client from '../../graphql/client';
import AppBooks from './AppBooks';
import AppBooksCreate from './AppBooksCreate';
import store from '../../store';

const App: FC = () => (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <AppBooksCreate />
      <AppBooks />
    </ApolloProvider>
  </Provider>
);

export default App;
