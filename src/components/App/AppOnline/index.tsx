import { useApolloClient } from '@apollo/react-hooks';
import React, { FC, useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { ActionType } from '../../../store/ducks';
import { getOnline, setOnline } from '../../../store/ducks/online';
import { setBooksLastModified } from '../../../store/ducks/booksLastModified';
import { BOOKS } from '../../../graphql/books';
import styles from './styles';

const AppOnline: FC = () => {
  const apolloClient = useApolloClient();
  const dispatch = useDispatch<Dispatch<ActionType>>();
  const online = useSelector(getOnline);
  const [loading, setLoading] = useState(false);
  const [errored, setErrored] = useState(false);
  const handleTogglePress = useCallback(() => {
    dispatch(setOnline(!online));
  }, [dispatch, online]);
  const handleSoftRefreshPress = useCallback(async () => {
    setErrored(false);
    setLoading(true);
    try {
      await apolloClient.query({
        fetchPolicy: 'network-only',
        query: BOOKS,
      });
    } catch (err) {
      setErrored(true);
    }
    setLoading(false);
  }, [apolloClient, BOOKS, setErrored, setLoading]);
  const handleHardRefreshPress = useCallback(async () => {
    setErrored(false);
    setLoading(true);
    dispatch(setBooksLastModified(0));
    try {
      await apolloClient.resetStore();
    } catch (err) {
      setErrored(true);
    }
    setLoading(false);
  }, [apolloClient, BOOKS, setErrored, setLoading]);

  if (loading) {
    return <Text>Loading</Text>;
  }
  return (
    <View style={styles.root}>
      <Text>
        Online:
        {online ? 'True' : 'False'}
      </Text>
      <TouchableOpacity onPress={handleTogglePress}>
        <Text>Toggle</Text>
      </TouchableOpacity>
      {online && (
        <>
          <TouchableOpacity onPress={handleSoftRefreshPress}>
            <Text>Soft Refresh</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleHardRefreshPress}>
            <Text>Hard Refresh</Text>
          </TouchableOpacity>
          {errored && <Text>Error Online Query</Text>}
        </>
      )}
    </View>
  );
};

export default AppOnline;
