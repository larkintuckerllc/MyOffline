import { ApolloCache } from 'apollo-cache';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, Operation } from 'apollo-link';
import { BOOKS, BOOKS_UPDATE, BooksData, BooksUpdateData } from './books';
import store from '../store';
import { getBooksLastModified, setBooksLastModified } from '../store/ducks/booksLastModified';

// eslint-disable-next-line
type Data = { [key: string]: any };

const { dispatch } = store;

const mutateOperation = (operation: Operation): void => {
  const mutatedOperation = operation;
  const { operationName } = operation;
  switch (operationName) {
    case 'books': {
      const booksLastModified = getBooksLastModified(store.getState());
      mutatedOperation.operationName = 'booksUpdate';
      mutatedOperation.query = BOOKS_UPDATE;
      mutatedOperation.variables = {
        lastModified: booksLastModified.toString(),
      };
      break;
    }
    default:
  }
};

const transformedData = (
  operationName: string,
  cache: ApolloCache<object>,
  data: Data,
  start: number
): Data => {
  switch (operationName) {
    case 'books': {
      const { booksUpdate } = data as BooksUpdateData;
      const booksLastModified = getBooksLastModified(store.getState());
      let booksCacheData: BooksData | null;
      // FIRST LOAD
      if (booksLastModified === 0) {
        dispatch(setBooksLastModified(start));
        return {
          books: booksUpdate.filter(({ isDeleted }) => !isDeleted),
        };
      }
      // SUBSEQUENT LOADS
      dispatch(setBooksLastModified(start));
      booksCacheData = cache.readQuery<BooksData>({ query: BOOKS });
      if (booksCacheData === null) {
        throw new Error(); // UNEXPECTED
      }
      const mutatedBooks = [...booksCacheData.books];
      booksUpdate.forEach(bookUpdate => {
        const bookMutatedIndex = mutatedBooks.findIndex(book => book.id === bookUpdate.id);
        if (bookMutatedIndex === -1 && !bookUpdate.isDeleted) {
          // CREATE
          mutatedBooks.push(bookUpdate);
        } else if (bookMutatedIndex !== -1 && bookUpdate.isDeleted) {
          // DELETE
          mutatedBooks.splice(bookMutatedIndex, 1);
        } else if (bookMutatedIndex !== -1 && !bookUpdate.isDeleted) {
          // UPDATE
          mutatedBooks.splice(bookMutatedIndex, 1);
          mutatedBooks.push(bookUpdate);
        }
      });
      return {
        books: mutatedBooks,
      };
    }
    default:
  }
  return data;
};

export default new ApolloLink((operation, forward) => {
  const { operationName } = operation;
  const context = operation.getContext();
  const { cache } = context as ApolloClient<object>;
  const start = Date.now();
  mutateOperation(operation); // NOT PURE
  return forward(operation).map(result => {
    const { data } = result;
    if (data === undefined || data === null) {
      return result;
    }
    return {
      data: transformedData(operationName, cache, data, start),
    };
  });
});
