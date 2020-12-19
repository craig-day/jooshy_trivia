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
import { ThemeProvider } from '@zendeskgarden/react-theming'
import Landing from './features/landing/Landing'
import { Join as JoinGame } from './features/game/Join'
import { Create as CreateGame } from './features/game/Create'
import { Edit as EditGame } from './features/game/Edit'
import { Create as MultipleChoice } from './features/admin/questions/MultipleChoice'

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

const App = () => (
  <ThemeProvider focusVisibleRef={null}>
    <ApolloProvider client={apolloClient}>
      <Router>
        <Switch>
          <Route path="/admin/questions" component={MultipleChoice} />
          <Route path="/create" component={CreateGame} />
          <Route
            path="/join/:code"
            render={({ match }) => <JoinGame code={match.params.code} />}
          />
          <Route path="/join" component={JoinGame} />
          <Route
            path="/game/:code/manage"
            render={({ match }) => <EditGame code={match.params.code} />}
          />
          <Route path="/" component={Landing} />
        </Switch>
      </Router>
    </ApolloProvider>
  </ThemeProvider>
)

export default App
