import { useMutation, useQuery } from '@apollo/react-hooks';
import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';
import { ScrollView, Text, View } from 'react-native';
import {
  Book,
  BooksData,
  BooksDeleteData,
  BooksDeleteVariables,
  BOOKS,
  BOOKS_DELETE,
  handleBooksDeleteUpdate,
} from '../../../graphql/books';
import { getOnline } from '../../../store/ducks/online';
import { getPageLoading } from '../../../store/ducks/pageLoading';
import { getPageError } from '../../../store/ducks/pageError';
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
  const online = useSelector(getOnline);
  const { loading, error, data } = useQuery<BooksData>(BOOKS);
  const [booksDelete] = useMutation<BooksDeleteData, BooksDeleteVariables>(BOOKS_DELETE, {
    context: {
      serializationKey: 'MUTATION',
      tracked: !online,
    },
    update: handleBooksDeleteUpdate,
  });
  const [errorDelete, setErrorDelete] = useState(false);

  if (loading) return <Text>Loading...</Text>;
  if (error || data === undefined) return <Text>Error Online Query</Text>;
  const sortedBooks = data.books.sort(bookSort); // CANNOT USE USEMEMO HERE
  return (
    <>
      {errorDelete && (
        <View style={styles.rootError}>
          <Text>Error Deleting</Text>
        </View>
      )}
      <ScrollView style={styles.rootBooks}>
        {sortedBooks.map(({ author, id, title }) => (
          <AppBooksBook
            author={author}
            booksDelete={booksDelete}
            key={id}
            id={id}
            setErrorDelete={setErrorDelete}
            title={title}
          />
        ))}
      </ScrollView>
    </>
  );
};

export default AppBooks;
