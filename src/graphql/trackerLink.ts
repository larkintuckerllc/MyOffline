import { ApolloLink } from 'apollo-link';
import { Dispatch } from 'redux';
import uuidv4 from 'uuid/v4';
import { ActionType } from '../store/ducks';
import { trackedQueriesAdd, trackedQueriesRemove } from '../store/ducks/trackedQueries';

export default (dispatch: Dispatch<ActionType>): ApolloLink =>
  new ApolloLink((operation, forward) => {
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
    const observer = forward(operation);
    observer.subscribe({
      error: () => {
        if (context.tracked) {
          dispatch(trackedQueriesRemove(id));
        }
      },
    });
    return observer.map(data => {
      if (context.tracked) {
        dispatch(trackedQueriesRemove(id));
      }
      return data;
    });
  });
