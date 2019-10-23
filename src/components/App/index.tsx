import { ApolloProvider, useApolloClient } from '@apollo/react-hooks';
import AsyncStorage from '@react-native-community/async-storage';
import { NormalizedCacheObject } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import { PersistedData, PersistentStorage } from 'apollo-cache-persist/types';
import React, { FC, useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import client, { cache, queueLink } from '../../graphql/client';
import store, { persistor } from '../../store';
import { getOnline } from '../../store/ducks/online';
import AppBooks from './AppBooks';
import AppBooksCreate from './AppBooksCreate';
import AppFailedQueries from './AppFailedQueries';
import AppOnline from './AppOnline';
import { getTrackedQueries, trackedQueriesRemove } from '../../store/ducks/trackedQueries';
import { getPageLoading } from '../../store/ducks/pageLoading';
import { BOOKS } from '../../graphql/books';
import { updateHandlerByName } from '../../graphql';
import styles from './styles';

const AppUsingReduxUsingApollo: FC = () => {
  const apolloClient = useApolloClient();
  const dispatch = useDispatch();
  const online = useSelector(getOnline);
  const trackedQueries = useSelector(getTrackedQueries);
  const [trackedLoaded, setTrackedLoaded] = useState(false);
  const [onlineQueryFailed, setOnlineQueryFailed] = useState(false);

  // TRACKED QUERIES (ONLY ON FIRST LOAD)
  useEffect(() => {
    const execute = async (): Promise<void> => {
      // eslint-disable-next-line
      const promises: Array<Promise<any>> = [];
      trackedQueries.forEach(trackedQuery => {
        const context = JSON.parse(trackedQuery.contextJSON);
        const query = JSON.parse(trackedQuery.queryJSON);
        const variables = JSON.parse(trackedQuery.variablesJSON);
        promises.push(
          apolloClient.mutate({
            context,
            mutation: query,
            optimisticResponse: context.optimisticResponse,
            update: updateHandlerByName[trackedQuery.name],
            variables,
          })
        );
        dispatch(trackedQueriesRemove(trackedQuery.id));
      });
      if (online) {
        try {
          await Promise.all(promises);
        } catch (e) {
          // ALLOW TRACKED QUERIES TO FAIL
        }
        try {
          await apolloClient.query({
            fetchPolicy: 'network-only',
            query: BOOKS,
          });
        } catch (e) {
          setOnlineQueryFailed(true);
        }
      }
      setTrackedLoaded(true);
    };
    execute();
  }, []);

  if (!trackedLoaded) {
    return <Text>Loading Tracked Queries</Text>;
  }
  if (onlineQueryFailed) {
    return <Text>Error Online Query</Text>;
  }
  return (
    <View style={styles.root}>
      <AppFailedQueries />
      <AppOnline />
      <AppBooksCreate />
      <AppBooks />
    </View>
  );
};

const AppUsingRedux: FC = () => {
  const online = useSelector(getOnline);
  const [cachePersisted, setCachePersisted] = useState(false);
  // APOLLO CLIENT PERSIST
  useEffect(() => {
    const execute = async (): Promise<void> => {
      await persistCache({
        cache,
        storage: AsyncStorage as PersistentStorage<PersistedData<NormalizedCacheObject>>,
      });
      setCachePersisted(true);
    };
    execute();
  }, [setCachePersisted]);
  // APOLLO CLIENT QUEUE
  useEffect(() => {
    if (online) {
      queueLink.open();
    } else {
      queueLink.close();
    }
  }, [online]);

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
