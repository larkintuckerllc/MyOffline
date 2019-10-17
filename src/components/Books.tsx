import { useQuery } from '@apollo/react-hooks';
import React, { FC } from 'react';
import { View, Text } from 'react-native';
import { Book, BooksData, BOOKS } from '../graphql/books';

const bookSort = (a: Book, b: Book): number => {
  if (a.id < b.id) {
    return -1;
  }
  if (a.id > b.id) {
    return 1;
  }
  return 0;
};

const Books: FC = () => {
  const { loading, error, data } = useQuery<BooksData>(BOOKS);
  if (loading) return <Text>Loading...</Text>;
  if (error || data === undefined) return <Text>Error :(</Text>;
  const sortedBooks = data.books.sort(bookSort); // CANNOT USE USEMEMO HERE
  return (
    <View>
      {sortedBooks.map(({ author, id, title }) => (
        <View key={id} style={{ marginTop: 30 }}>
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
        </View>
      ))}
    </View>
  );
};

export default Books;