import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { fetchMeta } from './services';
import type { Meta, MetaContextType, MetaProviderProps } from '../types';

const MetaContext = createContext<MetaContextType | undefined>(undefined);

export function MetaProvider({ children }: MetaProviderProps) {
  const [metaModels, setMetaModels] = useState<Meta[]>([]);
  const [loadingMetaModels, setLoadingMetaModels] = useState(true);

  function loadMetaModels() {
  
    return fetchMeta()
      .then((recset: Meta[]) => {
        setMetaModels(recset);
        setLoadingMetaModels(false);
      })
      .catch((er: any) => {
        console.error(er);
        setLoadingMetaModels(false);
        throw er;
      });

  }

  useEffect(() => {
    loadMetaModels();
  }, []);

  const value: MetaContextType = {
    metaModels,
    setMetaModels,
    loadMetaModels,
    loadingMetaModels,
  };
  if(!metaModels.length) {
    return false
  }
  return <MetaContext.Provider value={value}>{children}</MetaContext.Provider>;
}

export function useMeta(): MetaContextType {
  const context = useContext(MetaContext);
  if (context === undefined) {
    throw new Error('useMeta must be used within an MetaProvider');
  }
  return context;
}
