import { createRoot } from 'react-dom/client'
import App from './App'
import { 
  createTheme, 
  localStorageColorSchemeManager,
  MantineProvider 
} from '@mantine/core';
import { NotifyProvider } from './ui/Notify';
import '@mantine/core/styles.css';

const bus = new window.BroadcastChannel('device-sync')

function handleDeviceSync(data: any) {
  console.log('---- DeviceSync handler:', data)
}

window.addEventListener('message', (event: any)=>{
  let data = JSON.parse(event.data)
  if (data.type === 'device-sync') {
    console.log('---- Received post message:', data)
    bus.postMessage(JSON.stringify({
      type: 'device-sync',
      data: data
    }))
  }
});

bus.addEventListener('message', (event: any) => {
  let data = JSON.parse(event.data)
  if (data.type === 'device-sync') {
    console.log('---- Received channel message:', data)
    handleDeviceSync(data)
  }
})

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'cyan',
});

const colorSchemeManager = localStorageColorSchemeManager({
  key: 'my-app-color-scheme',
});

createRoot(document.getElementById('root')!).render(
  <MantineProvider 
    theme={theme}
    colorSchemeManager={colorSchemeManager}
    defaultColorScheme="light"
  >
    <NotifyProvider>
      <App />
    </NotifyProvider>
  </MantineProvider>,
)