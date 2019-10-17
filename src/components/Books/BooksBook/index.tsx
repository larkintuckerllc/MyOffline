import { ExecutionResult, MutationFunctionOptions } from '@apollo/react-common';
import React, { FC, useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { BooksDeleteData, BooksDeleteVariables } from '../../../graphql/books';

interface Props {
  author: string;
  booksDelete: (
    options: MutationFunctionOptions<BooksDeleteData, BooksDeleteVariables>
  ) => Promise<ExecutionResult<BooksDeleteData>>;
  id: string;
  title: string;
}

// TODO: ERROR
// TODO: UPDATE
const BooksBook: FC<Props> = ({ author, booksDelete, id, title }) => {
  const handlePress = useCallback(async (): Promise<void> => {
    try {
      await booksDelete({
        variables: {
          id,
        },
      });
    } catch (err) {
      //
    }
  }, []);

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
        <Text>DELETE</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BooksBook;
