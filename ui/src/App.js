import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import {
  ApolloClient,
  ApolloProvider,
  createHttpLink,
  InMemoryCache,
  split,
} from '@apollo/client'
import * as AbsintheSocket from '@absinthe/socket'
import { createAbsintheSocketLink } from '@absinthe/socket-apollo-link'
import { Socket as PhoenixSocket } from 'phoenix'
import { hasSubscription } from '@jumpn/utils-graphql'
import Landing from './features/landing/Landing'

const httpLink = createHttpLink({
  uri: 'https://localhost:4000/graphql',
})

const phoenixSocket = new PhoenixSocket('ws://localhost:4000/socket')

const absintheSocket = AbsintheSocket.create(phoenixSocket)

const websocketLink = createAbsintheSocketLink(absintheSocket)

const link = split(
  (operation) => hasSubscription(operation.query),
  websocketLink,
  httpLink
)

const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
})

const App = () => (
  <ApolloProvider client={apolloClient}>
    <Router>
      <Switch>
        <Route path="/">
          <Landing />
        </Route>
      </Switch>
    </Router>
  </ApolloProvider>
)

export default App
