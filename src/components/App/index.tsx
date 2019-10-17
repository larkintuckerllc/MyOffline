import { ApolloProvider } from '@apollo/react-hooks';
import React, { FC, useState } from 'react';
import { Text } from 'react-native';
import { Provider, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import client from '../../graphql/client';
import store, { persistor } from '../../store';
import { getOnline } from '../../store/ducks/online';
import AppBooks from './AppBooks';
import AppBooksCreate from './AppBooksCreate';
import AppOnline from './AppOnline';

const AppUsingRedux: FC = () => {
  const online = useSelector(getOnline);
  const [cachePersisted, setCachePersisted] = useState(false);

  /*
  if (!cachePersisted) {
    return <Text>Loading Apollo Client Persistence or Online</Text>;
  }
  */
  return (
    <ApolloProvider client={client}>
      <AppOnline />
      <AppBooksCreate />
      <AppBooks />
    </ApolloProvider>
  );
};

const App: FC = () => (
  <Provider store={store}>
    <PersistGate loading={<Text>Loading Redux Persistence</Text>} persistor={persistor}>
      <AppUsingRedux />
    </PersistGate>
  </Provider>
);

export default App;
