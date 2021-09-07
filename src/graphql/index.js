import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client";

import { onError } from 'apollo-link-error';
import { createUploadLink } from 'apollo-upload-client';
import { DOMAIN, COOKIE_NAME_AUTH_TOKEN, PROTOCOL } from './config';
import { setContext } from 'apollo-link-context';
import swal from 'sweetalert';
import Cookies from 'js-cookie';

const getToken = () => {
  const token = Cookies.get(COOKIE_NAME_AUTH_TOKEN);
  return token;
};

export const BASE_URL_LOCAL = `${PROTOCOL}${DOMAIN}`;

const httpLink = createUploadLink({
  uri: BASE_URL_LOCAL + '/graphql',
});

console.log(DOMAIN, COOKIE_NAME_AUTH_TOKEN, PROTOCOL, BASE_URL_LOCAL);

const cache = new InMemoryCache();

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => {
      return null;
    });
  }

  if (networkError) {
    swal({
      closeOnClickOutside: false,
      closeOnEsc: false,
      title: 'Whoops!!',
      text: 'Something went wrong. Come back later',
      icon: 'error',
    });
  }
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = getToken();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const link = ApolloLink.from([errorLink, httpLink]);

const client = new ApolloClient({
  link: authLink.concat(link),
  cache,
});

export default client;
