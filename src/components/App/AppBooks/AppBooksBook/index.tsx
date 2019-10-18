import { ExecutionResult, MutationFunctionOptions } from '@apollo/react-common';
import React, { FC, useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import {
  BooksDeleteData,
  booksDeleteOptimistic,
  BooksDeleteVariables,
} from '../../../../graphql/books';

interface Props {
  author: string;
  booksDelete: (
    options: MutationFunctionOptions<BooksDeleteData, BooksDeleteVariables>
  ) => Promise<ExecutionResult<BooksDeleteData>>;
  id: string;
  title: string;
}

const AppBooksBook: FC<Props> = ({ author, booksDelete, id, title }) => {
  const [submitting, setSubmitting] = useState(false);
  const [errored, setErrored] = useState(false);
  const handlePress = useCallback(async (): Promise<void> => {
    setErrored(false);
    setSubmitting(true);
    const book = {
      id,
    };
    try {
      await booksDelete({
        optimisticResponse: booksDeleteOptimistic(book),
        variables: book,
      });
    } catch (err) {
      setErrored(true);
      setSubmitting(false);
    }
  }, [booksDelete, setErrored, setSubmitting]);

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
      {errored && <Text style={styles.rootError}>Delete Error</Text>}
      <TouchableOpacity disabled={submitting} onPress={handlePress}>
        <Text style={submitting && styles.rootDeleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AppBooksBook;
