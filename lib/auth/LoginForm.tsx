import {useState} from 'react'
import {useAuth} from './AuthProvider'

export function LoginForm({
    onSuccess,
    onFailure,
    formClass,
    errorClass,
    labelClass,
    inputClass,
    headerClass,
    footerClass,
    submitClass
}: {
    onSuccess: (user: any) => void,
    onFailure: (error: any) => void,
    formClass: string,
    errorClass: string,
    labelClass: string,
    inputClass: string,
    headerClass: string,
    footerClass: string,
    submitClass: string
}) {
  let [error, setError] = useState()
  let auth = useAuth()

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    let formData = new FormData(event.currentTarget)
    let username = formData.get("username") as string
    let password = formData.get("password") as string
    
    try {
        const user = await auth.signin({username, password})
        onSuccess && onSuccess(user)
    }catch(e: any){
        onFailure && onFailure(e)
        setError(e.message)
    }
  }

  return (<form className={formClass} onSubmit={handleSubmit}>
        <div className={headerClass}>
            {error && <div className={errorClass}>{error}</div>}
        </div>

        <label className={labelClass} htmlFor="username">Username</label>
        <input
            required
            className={inputClass}
            minLength={4} 
            name="username"  
        />

        <label className={labelClass} htmlFor="password">Password</label>
        <input 
            required
            className={inputClass}
            minLength={4} 
            type="password"
            name="password"
        />

        <div className={footerClass}>
          <button className={submitClass} type="submit">Login</button>
        </div>
    </form>);
}