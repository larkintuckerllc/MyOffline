import { onError } from 'apollo-link-error';
import store from '../store';
import { setPageLoading } from '../store/ducks/pageLoading';

const { dispatch } = store;

export default onError(({ operation }) => {
  const { operationName } = operation;
  switch (operationName) {
    case 'booksPage': {
      // TODO
      /*
        currentPage = 0;
        // ERROR
      */
      dispatch(setPageLoading(false));
      break;
    }
    default:
  }
});
