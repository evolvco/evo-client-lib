import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
  } from 'react';
  import { find } from '../models/services';
  import { setRecords } from '../models/store';
  import { ModelRecord, RouteContextType, RouteProviderProps } from '../types';
  
  const RouteContext = createContext<RouteContextType | undefined>(undefined);
 
  export function RouteProvider({ children }: RouteProviderProps) {
    let [routes, setRoutes] = useState<ModelRecord[]>([]);
  
    useEffect(() => {
        find('sys_route').then((response) => {
          setRecords('sys_route', response.records);
          setRoutes(response.records);
        })
    }, []);
  
    const value: RouteContextType = { routes, setRoutes };
  
    return (
      <RouteContext.Provider value={value}>{children}</RouteContext.Provider>
    );
  }
  
  export function useModelRoutes(): RouteContextType {
    const context = useContext(RouteContext);
    if (context === undefined) {
      throw new Error('useModelRoutes must be used within an RouteProvider');
    }
    return context;
  }
  