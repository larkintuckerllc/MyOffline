import { ApolloProvider } from '@apollo/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { PersistedData, PersistentStorage } from 'apollo-cache-persist/types';
import React, { FC, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import client, { cache } from '../../graphql/client';
import store, { persistor } from '../../store';
import AppBooks from './AppBooks';
import AppBooksCreate from './AppBooksCreate';
import AppOnline from './AppOnline';

const AppUsingReduxUsingApollo: FC = () => {
  return (
    <>
      <AppOnline />
      <AppBooksCreate />
      <AppBooks />
    </>
  );
};

// TODO: QUEUE
// TODO: OPTIMISTIC
const AppUsingRedux: FC = () => {
  const [cachePersisted, setCachePersisted] = useState(false);
  useEffect(() => {
    const execute = async (): Promise<void> => {
      await persistCache({
        cache,
        storage: AsyncStorage as PersistentStorage<PersistedData<NormalizedCacheObject>>,
      });
      setCachePersisted(true);
    };
    execute();
  }, []);

  if (!cachePersisted) {
    return <Text>Loading Apollo Client Persistence or Online</Text>;
  }
  return (
    <ApolloProvider client={client}>
      <AppUsingReduxUsingApollo />
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
