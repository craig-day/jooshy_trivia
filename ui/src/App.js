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
import { Join as JoinGame } from './features/game/Join'
import { Create as CreateGame } from './features/game/Create'
import { Edit as EditGame } from './features/game/Edit'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
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
          <Route path="/create" component={CreateGame} />
          <Route
            path="/join/:code"
            render={({ match }) => <JoinGame code={match.params.code} />}
          />
          <Route path="/join" component={JoinGame} />
          <Route
            path="/game/:id/edit"
            render={({ match }) => <EditGame id={match.params.id} />}
          />
          <Route path="/" component={Landing} />
        </Switch>
      </Router>
    </ApolloProvider>
  </ThemeProvider>
)

export default App
