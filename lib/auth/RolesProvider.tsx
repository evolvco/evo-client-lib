import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';
import { find } from '../models/services';
import type { ModelRecord, RecordSet, RoleContextType, RoleProviderProps } from '../types';

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RolesProvider({ children }: RoleProviderProps) {
  const [roles, setRoles] = useState<ModelRecord[]>([]);
  const [loadingRoles, setLoadingRoles] = useState(true);

  function loadRoles() {
  
    return find('roles')
      .then((recset: RecordSet) => {
        setRoles(recset.records);
        setLoadingRoles(false);
      })
      .catch((er: any) => {
        console.error(er);
        setLoadingRoles(false);
        throw er;
      });
  }

  useEffect(() => {
    loadRoles();
  }, []);

  const value: RoleContextType = {
    roles,
    setRoles,
    loadRoles,
    loadingRoles,
  };
  if(!roles.length) {
    return false
  }
  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRoles(): RoleContextType {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRoles must be used within an RoleProvider');
  }
  return context;
}
