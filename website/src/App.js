import React from 'react'
import { ThemeProvider } from '@zendeskgarden/react-theming'
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router'
import { history } from './app/store'
import Landing from './features/landing/Landing'
import './App.css'

const App = () => (
  <ThemeProvider focusVisibleRef={null}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/create" render={() => null}></Route>
        <Route path="/join" render={() => null}></Route>
        <Route render={() => <Landing />} />
      </Switch>
    </ConnectedRouter>
  </ThemeProvider>
)

export default App
