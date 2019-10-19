import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import QueueLink from 'apollo-link-queue';
import { RetryLink } from 'apollo-link-retry';
import SerializingLink from 'apollo-link-serialize';
import { ApolloLink } from 'apollo-link';
import trackerLink from './trackerLink';
import trackerLinkError from './trackerLinkError';

const URI = 'http://localhost:5000/graphql';

export const cache = new InMemoryCache();
export const queueLink = new QueueLink();
export default new ApolloClient({
  link: ApolloLink.from([
    trackerLinkError,
    trackerLink,
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
