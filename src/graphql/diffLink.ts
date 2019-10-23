import { ApolloCache } from 'apollo-cache';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, Operation } from 'apollo-link';
import {
  BOOKS,
  BOOKS_PAGE,
  BOOKS_UPDATE,
  BooksData,
  BooksPageData,
  BooksUpdateData,
} from './books';
// eslint-disable-next-line
import client from '../graphql/client';
import store from '../store';
import { getBooksLastModified, setBooksLastModified } from '../store/ducks/booksLastModified';
import { getPagePage, setPagePage } from '../store/ducks/pagePage';

// eslint-disable-next-line
type Data = { [key: string]: any };

const FIRST = 2;

const { dispatch } = store;

const mutateOperation = (operation: Operation): void => {
  const mutatedOperation = operation;
  const { operationName } = operation;
  switch (operationName) {
    case 'books': {
      const state = store.getState();
      const booksLastModified = getBooksLastModified(state);
      // FIRST LOAD
      if (booksLastModified === 0) {
        const pagePage = getPagePage(state);
        const offset = pagePage * FIRST;
        mutatedOperation.operationName = 'booksPage';
        mutatedOperation.query = BOOKS_PAGE;
        mutatedOperation.variables = {
          offset,
          first: FIRST,
        };
        break;
      }
      // SUBSEQUENT LOADS
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
      const booksLastModified = getBooksLastModified(store.getState());
      let booksCacheData: BooksData | null;
      // FIRST LOAD
      if (booksLastModified === 0) {
        const {
          booksPage: { books, count },
        } = data as BooksPageData;
        const state = store.getState();
        const pagePage = getPagePage(state);
        // TODO: CACHE
        const lastPage = Math.floor(count / FIRST);
        if (pagePage < lastPage) {
          // TODO: LOADING
          // TODO: RESET
          dispatch(setPagePage(pagePage + 1));
          // TODO: ERROR
          setTimeout(() => {
            client
              .query({
                fetchPolicy: 'network-only',
                query: BOOKS,
              })
              .catch(err => console.log('WTF'));
            //
          }, 0);
        }
        // dispatch(setBooksLastModified(start)); // TODO
        return {
          books,
        };
      }
      // SUBSEQUENT LOADS
      dispatch(setBooksLastModified(start));
      const { booksUpdate } = data as BooksUpdateData;
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
