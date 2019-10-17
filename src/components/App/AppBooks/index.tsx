import { useMutation, useQuery } from '@apollo/react-hooks';
import React, { FC } from 'react';
import { ScrollView, Text } from 'react-native';
import {
  Book,
  BooksData,
  BooksDeleteData,
  BooksDeleteVariables,
  BOOKS,
  BOOKS_DELETE,
  handleBooksDeleteUpdate,
} from '../../../graphql/books';
import styles from './styles';
import AppBooksBook from './AppBooksBook';

const bookSort = (a: Book, b: Book): number => {
  if (a.author < b.author) {
    return -1;
  }
  if (a.author > b.author) {
    return 1;
  }
  return 0;
};

const AppBooks: FC = () => {
  const { loading, error, data } = useQuery<BooksData>(BOOKS);
  const [booksDelete] = useMutation<BooksDeleteData, BooksDeleteVariables>(BOOKS_DELETE, {
    update: handleBooksDeleteUpdate,
  });
  if (loading) return <Text>Loading...</Text>;
  if (error || data === undefined) return <Text>Error :(</Text>;
  const sortedBooks = data.books.sort(bookSort); // CANNOT USE USEMEMO HERE

  return (
    <ScrollView style={styles.root}>
      {sortedBooks.map(({ author, id, title }) => (
        <AppBooksBook author={author} booksDelete={booksDelete} key={id} id={id} title={title} />
      ))}
    </ScrollView>
  );
};

export default AppBooks;
