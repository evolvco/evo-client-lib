import {useState, useEffect, useContext, createContext} from 'react'
import * as auth from './services'
import {setToken, getRestDomain} from './store'

let AuthContext = createContext()

export function AuthProvider({ children }) {
  let [user, setUser] = useState()

  useEffect(()=>{
    checkUser()
  },[user])

  const signin = async ({username, password}) => {
    try{
      const token = await auth.login({username, password})
      setToken(token)
      const user = await auth.getUser()
      setUser(user)
      return user
    }
    catch(error){
      setUser(false)
      throw error
    } 
  }

  const checkUser = async() => {
    if(user) {
      return user
    }
    try{
      const token = await auth.refresh(getRestDomain()?localStorage.getItem('refresh-token'):'')
      if(!token){
        throw 'no valid refresh token'
      }
      setToken(token)
      const user = await auth.getUser()
      if(!user){
        throw 'no valid user'
      }
      setUser(user)
      return user
    }
    catch(error){
      setUser(false)
      return false
    }
  }

  const signout = async () => {
    try{
      await auth.release()
      setUser(false)
      return
    }catch{
      setUser(false)
      return
    }
  }

  let value = {user, signin, signout, checkUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}