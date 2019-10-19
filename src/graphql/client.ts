import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import QueueLink from 'apollo-link-queue';
import { RetryLink } from 'apollo-link-retry';
import SerializingLink from 'apollo-link-serialize';
import { ApolloLink } from 'apollo-link';
import trackerLink from './trackerLink';
import store from '../store';
import { trackedQueriesRemove } from '../store/ducks/trackedQueries';

const URI = 'http://localhost:5000/graphql';

export const cache = new InMemoryCache();
export const queueLink = new QueueLink();

export default new ApolloClient({
  link: ApolloLink.from([
    onError(({ operation, networkError }) => {
      const context = operation.getContext();
      const { tracked, trackedId } = context;
      // TRACKER_LINK DOES NOT HANDLE NETWORK ERRORS
      if (networkError && tracked) {
        store.dispatch(trackedQueriesRemove(trackedId));
      }
      if (tracked) {
        const name: string = operation.operationName;
        const variablesJSON: string = JSON.stringify(operation.variables);
        // TODO: SAVE INTO REDUX
        console.log(name);
        console.log(variablesJSON);
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
