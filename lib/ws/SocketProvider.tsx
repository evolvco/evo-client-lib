import { getSocketDomain } from '../auth/store'
import React, { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { SocketContextType, SocketProviderProps } from '../types/components.types';


const SocketContext = createContext<SocketContextType | undefined>(undefined);

export function SocketProvider({ children }: SocketProviderProps) {
  const [ws, setWs] = useState<WebSocket | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);
  const [messages, setMessages] = useState<any[]>([]);

  useEffect(() => {
    const _ws = new WebSocket(`${getSocketDomain()}/ws`);


    _ws.addEventListener('open', (ev) => {
      setIsReady(true);
      console.log("new WebSocket connected");

      const hello = {
        resourse: 'socket',
        action: 'connected',
        messages: 'hello'
      };
      _ws.send(JSON.stringify(hello));
    });

    _ws.addEventListener('close', (ev) => {
      setIsReady(false);
      console.log("WebSocket connected closed");
    });

    _ws.addEventListener('message', (ev) => {
      const data = JSON.parse(ev.data);
      console.log('new message from websocket', data);
      setMessages([...messages, data]);
    });

    setWs(_ws);
    
    return () => {
      if (ws) {
        ws.close();
      }
      setIsReady(false);
    };
  }, []);

  const sendMessage = (message: string) => {
    if (ws) {
      ws.send(message);
    }
  };

  const value: SocketContextType = {
    ws, 
    isReady, 
    sendMessage,
    messages
  };

  return <SocketContext.Provider value={value}>{children}</SocketContext.Provider>;
}

export function useSocket(): SocketContextType {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
}
