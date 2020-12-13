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
import { DEFAULT_THEME, ThemeProvider } from '@zendeskgarden/react-theming'
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

const theme = {
  ...DEFAULT_THEME,
  fontSizes: {
    xs: '12px',
    sm: '14px',
    md: '18px',
    lg: '22px',
    xl: '26px',
    xxl: '36px',
    xxxl: '48px',
  },
}

const App = () => (
  <ThemeProvider focusVisibleRef={null} theme={theme}>
    <ApolloProvider client={apolloClient}>
      <Router>
        <Switch>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  </ThemeProvider>
)

export default App
