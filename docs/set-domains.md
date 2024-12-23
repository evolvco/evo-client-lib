### Set Domains example
*/src/App.js*
```
import { AuthProvider, setRestDomain, setSocketDomain } from 'evo-client-lib'
import { BrowserRouter } from 'react-router-dom'
import Router from './Router'

setRestDomain('http://localhost:3030')
setSocketDomain('http://localhost:3030')

function App() {
  ...
}

export default App
```