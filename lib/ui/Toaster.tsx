import { Notify, useNotify } from "./Notify"

export function Toaster() {
    const n = useNotify()
    //console.log('---notify message', n)
    return <Notify open={!!n?.message.type} onClose={()=>n?.setMessage({})} title={n?.message.title} type={n?.message.type}>
        {n?.message.message}
    </Notify>
}