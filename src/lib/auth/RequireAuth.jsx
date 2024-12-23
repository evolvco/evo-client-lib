import {useAuth} from './AuthProvider'

export function RequireAuth({ children, onFailure=()=>{}, loader, loaderClass }) {
  let {user} = useAuth()

  console.log(11111, user)
  if (user===false) {
    return onFailure()
  }else if(user?.username) {
    console.log(2222, user.username, children)
    return children;
  }else{
    if (loader) return loader
    return <div className={loaderClass}></div>
  }
}