import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Landing from './features/landing/Landing'

const App = () => (
  <Router>
    <Switch>
      <Route path="/">
        <Landing />
      </Route>
    </Switch>
  </Router>
)

export default App
