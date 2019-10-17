import { ExecutionResult, MutationFunctionOptions } from '@apollo/react-common';
import React, { FC, useCallback, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { BooksDeleteData, BooksDeleteVariables } from '../../../../graphql/books';

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
    try {
      setErrored(false);
      setSubmitting(true);
      await booksDelete({
        variables: {
          id,
        },
      });
    } catch (err) {
      setErrored(true);
      setSubmitting(false);
    }
  }, [booksDelete]);

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
