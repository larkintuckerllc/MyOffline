import gql from 'graphql-tag';

export interface Book {
  author: string;
  id: string;
  title: string;
}

export interface BookUpdate extends Book {
  isDeleted: boolean;
}

export interface BooksData {
  books: Book[];
}

export interface BooksUpdateData {
  booksUpdate: BookUpdate[];
}

export const BOOKS = gql`
  query books {
    books {
      author
      id
      title
    }
  }
`;

export const BOOKS_UPDATE = gql`
  query booksUpdate($lastModified: Int!) {
    booksUpdate(lastModified: $lastModified) {
      author
      id
      isDeleted
      title
      __typename
    }
  }
`;
