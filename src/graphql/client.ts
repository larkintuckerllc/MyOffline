import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
import QueueLink from 'apollo-link-queue';
import { RetryLink } from 'apollo-link-retry';
import SerializingLink from 'apollo-link-serialize';
import { ApolloLink } from 'apollo-link';

const URI = 'http://localhost:5000/graphql';

export const cache = new InMemoryCache();
export const queueLink = new QueueLink();

export default new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.forEach(({ message, locations, path }) =>
          // eslint-disable-next-line
          console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
        );
      // eslint-disable-next-line
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
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
