import {useState, useEffect, useContext, createContext} from 'react'
import {getAccessToken, getSocketDomain} from '../auth/store'

let SocketContext = createContext()

export function SocketProvider({ children }) {

    const [ws, setWs] = useState(null);
    const [isReady, setIsReady] = useState(false)

    const [messages, setMessages] = useState([]);

    useEffect(() => {
        
        //mount
        const _ws = new WebSocket(`${getSocketDomain()}/ws`);

        _ws.addEventListener('open',(ev) => {
            setIsReady(true)
            console.log("new WebSocket connected");

            const hello = {
                resourse: 'socket',
                action: 'connected',
                messages: 'hello'
            }
            _ws.send(JSON.stringify(hello))
        })

        _ws.addEventListener('close',(ev) => {
            setIsReady(false)
            console.log("WebSocket connected closed");
        })
    
        _ws.addEventListener('message', (ev) => {
            const data = JSON.parse(ev.data)
            console.log('new message from websocket', data)
            setMessages([...messages, data]);
        })
    
        setWs(_ws);
        
        //unmount
        return () => {
          if (ws) {
            ws.close();
          }
          setIsReady(false)
        };
      }, []);

    const sendMessage = (message) => {
        if (ws) {
          ws.send(message);
        }
    };

    let value = {
        ws, 
        isReady, 
        sendMessage,
        messages
    };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
}

export function useSocket() {
  return useContext(SocketContext);
}