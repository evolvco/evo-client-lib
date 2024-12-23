import {useAuth} from './AuthProvider'

export function RequireAuth({ children, onFailure=()=>{}, loader, loaderClass }) {
  let {user} = useAuth()

  console.log(user)
  if (user===false) {
    return onFailure()
  }else if(user && user.username) {
    return children;
  }else{
    if (loader) return loader
    return <div className={loaderClass}></div>
  }
}