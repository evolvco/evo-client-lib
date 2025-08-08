import { createRoot } from 'react-dom/client'
import { App } from './App'
import { EvoProvider } from '@lib/ui';

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

createRoot(document.getElementById('root')!).render(
  <EvoProvider>
    <App />
  </EvoProvider>,
)