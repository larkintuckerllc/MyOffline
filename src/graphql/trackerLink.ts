import { ApolloLink } from 'apollo-link';
import uuidv4 from 'uuid/v4';
import store from '../store';
import { trackedQueriesAdd, trackedQueriesRemove } from '../store/ducks/trackedQueries';

const { dispatch } = store;
export default new ApolloLink((operation, forward) => {
  if (forward === undefined) {
    return null;
  }
  const name: string = operation.operationName;
  const queryJSON: string = JSON.stringify(operation.query);
  const variablesJSON: string = JSON.stringify(operation.variables);
  const context = operation.getContext();
  const contextJSON = JSON.stringify(context);
  const id = uuidv4();
  if (context.tracked) {
    operation.setContext({ ...context, trackedId: id });
    dispatch(
      trackedQueriesAdd({
        contextJSON,
        id,
        name,
        queryJSON,
        variablesJSON,
      })
    );
  }
  return forward(operation).map(data => {
    const returnContext = operation.getContext();
    if (returnContext.tracked) {
      dispatch(trackedQueriesRemove(returnContext.trackedId));
    }
    return data;
  });
});
