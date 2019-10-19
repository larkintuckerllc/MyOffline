import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import QueueLink from 'apollo-link-queue';
import { RetryLink } from 'apollo-link-retry';
import SerializingLink from 'apollo-link-serialize';
import { ApolloLink } from 'apollo-link';
import uuidv4 from 'uuid/v4';
import trackerLink from './trackerLink';
import store from '../store';
import { trackedQueriesRemove } from '../store/ducks/trackedQueries';
import { failedQueriesAdd } from '../store/ducks/failedQueries';

const URI = 'http://localhost:5000/graphql';

export const cache = new InMemoryCache();
export const queueLink = new QueueLink();

export default new ApolloClient({
  link: ApolloLink.from([
    onError(({ operation, networkError }) => {
      const { dispatch } = store;
      const context = operation.getContext();
      const { tracked, trackedId } = context;
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
    }),
    trackerLink(store.dispatch),
    queueLink,
    new SerializingLink(),
    new RetryLink(),
    new HttpLink({
      uri: URI,
      credentials: 'same-origin',
    }),
  ]),
  cache,
});
