import { ExecutionResult, MutationFunctionOptions } from '@apollo/react-common';
import React, { FC, useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import styles from './styles';
import {
  BooksDeleteData,
  booksDeleteOptimistic,
  BooksDeleteVariables,
} from '../../../../graphql/books';
import { getOnline } from '../../../../store/ducks/online';

interface Props {
  author: string;
  booksDelete: (
    options: MutationFunctionOptions<BooksDeleteData, BooksDeleteVariables>
  ) => Promise<ExecutionResult<BooksDeleteData>>;
  id: string;
  setErrorDelete: (flag: boolean) => void;
  title: string;
}

const AppBooksBook: FC<Props> = ({ author, booksDelete, id, setErrorDelete, title }) => {
  const online = useSelector(getOnline);
  const handlePress = useCallback(async (): Promise<void> => {
    setErrorDelete(false);
    const book = {
      id,
    };
    try {
      await booksDelete({
        optimisticResponse: booksDeleteOptimistic(book),
        variables: book,
      });
    } catch (err) {
      if (online) {
        setErrorDelete(true);
      }
    }
  }, [booksDelete, online, setErrorDelete]);

  return (
    <View style={styles.root}>
      <Text>
        author:
        {author}
      </Text>
      <Text>
        id:
        {id}
      </Text>
      <Text>
        title:
        {title}
      </Text>
      <TouchableOpacity onPress={handlePress}>
        <Text>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AppBooksBook;
