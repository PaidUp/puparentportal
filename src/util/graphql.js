import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import config from '@/config'

const defaultOptions = {
  watchQuery: {
    fetchPolicy: 'network-only',
    errorPolicy: 'ignore'
  },
  query: {
    fetchPolicy: 'no-cache',
    errorPolicy: 'all'
  }
}

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token = localStorage.token
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : null
    }
  })
  return forward(operation)
})

const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: config.api.broker + '/graphql'
})

const apolloClient = new ApolloClient({
  link: authMiddleware.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: false,
  defaultOptions
})

export default apolloClient
