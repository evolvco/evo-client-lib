import {useAuth} from './AuthProvider'
import type { RequireAuthProps } from '../types'

export function RequireAuth({ 
  children, 
  onFailure=()=>{}, 
  loader, 
  loaderClass 
}: RequireAuthProps): React.ReactNode {
  let {user} = useAuth()

  if (user===false) {
    onFailure()
    return <></>
  }else if(user?.username) {
    return children;
  }else{
    if (loader) return loader
    return <div className={loaderClass}></div>
  }
}