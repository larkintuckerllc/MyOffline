import { onError } from 'apollo-link-error';
import store from '../store';
import { setPageLoading } from '../store/ducks/pageLoading';
import { setPageCount } from '../store/ducks/pageCount';
import { setPageError } from '../store/ducks/pageError';

const { dispatch } = store;

export default onError(({ operation }) => {
  const { operationName } = operation;
  switch (operationName) {
    case 'booksPage': {
      dispatch(setPageError(true));
      dispatch(setPageCount(0));
      dispatch(setPageLoading(false));
      break;
    }
    default:
  }
});
