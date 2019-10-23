import { ApolloCache } from 'apollo-cache';
import { ApolloClient } from 'apollo-client';
import { ApolloLink, Operation } from 'apollo-link';
import { BOOKS, BOOKS_PAGE, BooksData, BooksPageData } from './books';
// eslint-disable-next-line
import client from '../graphql/client';
import store from '../store';
import { getBooksLastModified, setBooksLastModified } from '../store/ducks/booksLastModified';
import { setPageLoading } from '../store/ducks/pageLoading';

// eslint-disable-next-line
type Data = { [key: string]: any };

const FIRST = 2;
let currentPage = 0;
let firstStart = 0;

const { dispatch } = store;

const mutateOperation = (operation: Operation): void => {
  const mutatedOperation = operation;
  const { operationName } = operation;
  switch (operationName) {
    case 'books': {
      const state = store.getState();
      const booksLastModified = getBooksLastModified(state);

      // SUBSEQUENT LOADS
      if (booksLastModified !== 0) {
        break;
      }

      // FIRST PAGE
      if (currentPage === 0) {
        dispatch(setPageLoading(true));
      }

      const offset = currentPage * FIRST;
      mutatedOperation.operationName = 'booksPage';
      mutatedOperation.query = BOOKS_PAGE;
      mutatedOperation.variables = {
        offset,
        first: FIRST,
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
      const state = store.getState();
      const booksLastModified = getBooksLastModified(state);

      // TODO: ERROR

      // SUBSEQUENTIAL LOADS
      if (booksLastModified !== 0) {
        break;
      }

      const {
        booksPage: { books, count },
      } = data as BooksPageData;
      const lastPage = Math.floor(count / FIRST);
      const isFirstPage = currentPage === 0;
      const isLastPage = currentPage === lastPage;

      // FIRST PAGE
      if (isFirstPage) {
        firstStart = start;
      }

      // LAST PAGE
      if (isLastPage) {
        currentPage = 0;
        dispatch(setBooksLastModified(firstStart));
        firstStart = 0;
        dispatch(setPageLoading(false));
      }

      // QUEUE UP NEXT PAGE
      if (!isLastPage) {
        currentPage += 1;
        setTimeout(() => {
          client.query({
            fetchPolicy: 'network-only',
            query: BOOKS,
          });
        }, 0);
      }

      // FIRST PAGE
      if (isFirstPage) {
        return {
          books,
        };
      }

      // SUBSEQUENT PAGES
      const booksCacheData = cache.readQuery<BooksData>({ query: BOOKS });
      if (booksCacheData === null) {
        throw new Error(); // UNEXPECTED
      }
      const mutatedBooks = [...booksCacheData.books, ...books];
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
