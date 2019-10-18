import { MutationUpdaterFn } from 'apollo-client';
import { handleBooksCreateUpdate, handleBooksDeleteUpdate } from './books';

interface UpdateHandlerByName {
  // eslint-disable-next-line
  [key: string]: MutationUpdaterFn<any>;
}

// eslint-disable-next-line
export const updateHandlerByName: UpdateHandlerByName = {
  booksCreate: handleBooksCreateUpdate,
  booksDelete: handleBooksDeleteUpdate,
};
