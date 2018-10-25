import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { createUploadLink } from 'apollo-upload-client'
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

const apolloClient = new ApolloClient({
  link: authMiddleware.concat(createUploadLink({
    uri: config.api.broker + '/graphql'
  })),
  cache: new InMemoryCache(),
  connectToDevTools: false,
  defaultOptions
})

export default apolloClient
