import Home from './Home'
import { AuthProvider } from './lib/auth'

export default function App() {

  return (
    <AuthProvider>
      <Home />
    </AuthProvider>
  )
}
