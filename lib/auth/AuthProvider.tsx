import { useState, useContext, createContext, ReactNode, useEffect } from 'react';
import * as auth from './services';
import { getRestDomain, setToken } from './store';

interface AuthUser {
  [key: string]: any;
}

interface AuthContextType {
  user: AuthUser | null | undefined | false;
  signin: (credentials: { username: string; password: string }) => Promise<AuthUser>;
  signout: () => Promise<void>;
  checkUser: () => Promise<AuthUser | false>;
  hasPerm: (perm:string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

interface RoleStack {
  stack: any[];
  ids: string[];
  perms: string[];
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null | undefined | false>();
  
  useEffect(()=>{
    checkUser()
  },[user])

  const signin = async ({ username, password }: { username: string; password: string }): Promise<AuthUser> => {
    try {
      const token = await auth.login({ username, password });
      setToken(token);
      const user = await auth.getUser();
      setUser(user);
      return user;
    }
    catch (error) {
      setUser(false as any);
      throw error;
    } 
  };

  const hasPerm = (p:string) => {
    if (!user || !user.roles) return false;

    const match = user.roles.find((role:any) => {
      return role.perms.find((perm:any) => {
        if(perm.key === '*') return true;
        if(perm.key === '+:*:*') return true;
        if(perm.key === '*:*:*') return true;
        if(perm.key === p) return true;
      })
    });
    //console.log('---hasPerm match', p, match)
    return !!match;
  }

  const checkUser = async (): Promise<AuthUser | false> => {
    if (user) {
      return user;
    }
    try {
      const token = await auth.refresh(getRestDomain()?localStorage.getItem('refresh-token'):'');
      if (!token) {
        throw new Error('no valid refresh token');
      }
      setToken(token);
      const user = await auth.getUser();
      if (!user) {
        throw new Error('no valid user');
      }
      setUser(user);
      return user;
    }
    catch (error) {
      setUser(false as any);
      return false;
    }
  };

  const signout = async (): Promise<void> => {
    try {
      await auth.release();
      setUser(false as any);
      return;
    } catch {
      setUser(false as any);
      return;
    }
  };

  const value: AuthContextType = { user, signin, signout, checkUser, hasPerm };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
