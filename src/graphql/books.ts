import { MutationUpdaterFn } from 'apollo-client';
import gql from 'graphql-tag';

export interface Book {
  author: string;
  id: string;
  title: string;
}

interface BookId {
  id: string;
}

interface BookGraphQL extends Book {
  __typename: string;
}

interface BookIdGraphQL extends BookId {
  __typename: string;
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
  id: string;
  title: string;
}

export interface BooksCreateData {
  booksCreate: Book;
}

interface BooksCreateDataGraphQL {
  booksCreate: BookGraphQL;
}

export interface BooksDeleteVariables {
  id: string;
}

export interface BooksDeleteData {
  booksDelete: BookId;
}

interface BooksDeleteDataGraphQL {
  booksDelete: BookIdGraphQL;
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

export const BOOKS_PAGE = gql`
  query booksPage($offset: Int!, $first: Int!) {
    booksPage(input: { offset: $offset, first: $first }) {
      books {
        author
        id
        title
      }
      count
    }
  }
`;

export const BOOKS_CREATE = gql`
  mutation booksCreate($id: String!, $author: String!, $title: String!) {
    booksCreate(input: { id: $id, author: $author, title: $title }) {
      author
      id
      title
    }
  }
`;

export const BOOKS_DELETE = gql`
  mutation booksDelete($id: String!) {
    booksDelete(id: $id) {
      id
    }
  }
`;

export const booksCreateOptimistic = (book: BooksCreateVariables): BooksCreateDataGraphQL => {
  const bookGraphQL = { ...book, __typename: 'Book' };
  return {
    booksCreate: bookGraphQL,
  };
};

export const booksDeleteOptimistic = (book: BooksDeleteVariables): BooksDeleteDataGraphQL => {
  const bookGraphQL = { ...book, __typename: 'Book' };
  return {
    booksDelete: bookGraphQL,
  };
};

export const handleBooksCreateUpdate: MutationUpdaterFn<BooksCreateData> = (cache, { data }) => {
  if (data === undefined || data === null) {
    return;
  }
  const { booksCreate } = data;
  const cacheData = cache.readQuery<BooksData>({ query: BOOKS });
  if (cacheData === null) {
    return;
  }
  const { books } = cacheData;
  const updateBooks = [...books, booksCreate];
  cache.writeQuery({
    data: { books: updateBooks },
    query: BOOKS,
  });
};

export const handleBooksDeleteUpdate: MutationUpdaterFn<BooksDeleteData> = (cache, { data }) => {
  if (data === undefined || data === null) {
    return;
  }
  const { booksDelete } = data;
  const cacheData = cache.readQuery<BooksData>({ query: BOOKS });
  if (cacheData === null) {
    return;
  }
  const { books } = cacheData;
  const updateBooks = [...books];
  const booksDeleteIndex = updateBooks.findIndex(book => book.id === booksDelete.id);
  updateBooks.splice(booksDeleteIndex, 1);
  cache.writeQuery({
    data: { books: updateBooks },
    query: BOOKS,
  });
};
