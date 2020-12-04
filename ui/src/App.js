import './App.css'
import { ThemeProvider } from '@zendeskgarden/react-theming'
import Landing from './containers/Landing'

const App = (_props) => (
  <div className="landing">
    <ThemeProvider>
      <Landing />
    </ThemeProvider>
  </div>
)

export default App
