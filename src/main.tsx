import { createRoot } from 'react-dom/client'
import { App } from './App'
import { EvoProvider } from '@lib/ui';

createRoot(document.getElementById('root')!).render(
  <EvoProvider>
    <App />
  </EvoProvider>,
)