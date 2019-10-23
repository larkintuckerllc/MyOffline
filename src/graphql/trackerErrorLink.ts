import { onError } from 'apollo-link-error';
import uuidv4 from 'uuid/v4';
import store from '../store';
import { trackedQueriesRemove } from '../store/ducks/trackedQueries';
import { failedQueriesAdd } from '../store/ducks/failedQueries';

export default onError(({ operation, networkError }) => {
  const { dispatch } = store;
  const context = operation.getContext();
  const { tracked, trackedId } = context;
  // TODO: COLLAPSE ALL ERROR HANDLING
  // TRACKER_LINK DOES NOT HANDLE NETWORK ERRORS
  if (networkError && tracked) {
    dispatch(trackedQueriesRemove(trackedId));
  }
  if (tracked) {
    const id = uuidv4();
    const name: string = operation.operationName;
    const variablesJSON: string = JSON.stringify(operation.variables);
    dispatch(
      failedQueriesAdd({
        id,
        name,
        variablesJSON,
      })
    );
  }
});
