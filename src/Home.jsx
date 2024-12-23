import { useState } from "react"
import { useAuth, LoginForm } from "./lib/auth"

export default function Home() {
    const [info, setInfo] = useState('')
    const {user, signout} = useAuth()

    if(user){
        return (<>
            <h1>Vite + React + Evo</h1>   
            <h2>Info</h2>
            <div>{info}</div>        

            <h2>Forms</h2>
            <button onClick={async ()=>{
                try{
                    await signout('Signout Succesfully')
                    setInfo()
                } catch(e) {
                    setInfo('Failed Signout')
                }
            }}>{`Signout ${user?.username}`}</button>
        </>)
    }

    if(user===false){
        return <LoginForm 
            onSuccess={(user)=>{
                setInfo(`${user.username} Logged in Successfully`)
            }}
            onFailure={(e)=>{
                setInfo(e.message)
            }}
        />
    }

    return <p>Authenticating</p>
    
}
