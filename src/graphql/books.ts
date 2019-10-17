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

export interface BooksCreateVariables {
  author: string;
  title: string;
}

export interface BooksCreateData {
  booksCreate: Book;
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
  query booksUpdate($lastModified: String!) {
    booksUpdate(lastModified: $lastModified) {
      author
      id
      isDeleted
      title
      __typename
    }
  }
`;

export const BOOKS_CREATE = gql`
  mutation booksCreate($author: String!, $title: String!) {
    booksCreate(input: { author: $author, title: $title }) {
      author
      id
      isDeleted
      title
    }
  }
`;
