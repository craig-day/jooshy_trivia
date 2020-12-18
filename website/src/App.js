import React from 'react'
import { DEFAULT_THEME, ThemeProvider } from '@zendeskgarden/react-theming'
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router'
import { history } from './app/store'
import Landing from './features/landing/Landing'
import './App.css'
import { Create as CreateGame } from './features/game/Create'
import { Join as JoinGame } from './features/game/Join'
import { Edit as EditGame } from './features/game/Edit'
import { Create } from './features/admin/questions/MultipleChoice'

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
  <ThemeProvider theme={theme} focusVisibleRef={null}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/games/:gameId/edit" component={EditGame} />
        <Route exact path="/admin/questions" component={Create} />
        <Route path="/create" component={CreateGame}></Route>
        <Route exact path="/join/:code" render={() => null} />
        <Route path="/join" component={JoinGame}></Route>
        <Route render={() => <Landing />} />
      </Switch>
    </ConnectedRouter>
  </ThemeProvider>
)

export default App
