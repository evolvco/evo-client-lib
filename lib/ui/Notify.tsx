import { useState, useContext, createContext } from 'react'
import { Alert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { capitalize } from '../utils'

export interface INotifyType {
    [key: string]: string
}

export interface INotifyValue {
    message:INotifyType,
    setMessage:Function,
    success:Function,
    error:Function,
    warning:Function,
    info:Function
}

export function Notify({
    mt,
    type = "info",
    title,
    children,
    open,
    onClose,
    ...rest
}: { mt?: string, type?: string, title?: string, onClose?:()=>{}|null, children: React.ReactNode, open?: boolean }) {

    let clr: INotifyType = {
        info: 'yellow',
        success: 'green',
        warning: 'orange',
        danger: 'red'
    }

    const icon = <IconInfoCircle />;

    if (!open) {
        return
    }

    return (<Alert
        variant="light"
        color={clr[type]}
        radius="md"
        onClose={onClose}
        withCloseButton
        title={title || capitalize(type)}
        icon={icon}
        {...rest}
    >
        {children}
    </Alert>);
}

let NotifyContext = createContext<INotifyValue|null>(null)

export function NotifyProvider({ children }: { children: React.ReactNode }) {

    const [message, setMessage] = useState<INotifyType>({})

    const success = (title:string, message?:string) => {
        console.log('--success', title, message)
        if(title && message){
         
        setMessage({
            message:message,
            type:'success',
            title:title
        })
        }else{
            setMessage({
                message:title,
                type:'success',
            })
        }
    }

    const error = (title:string, message?:string) => {
        if(title && message){
         
        setMessage({
            message:message,
            type:'danger',
            title:title
        })
        }else{
            setMessage({
                message:title,
                type:'danger',
            })
        }
    }

    const warning = (title:string, message?:string) => {
        if(title && message){
         
        setMessage({
            message:message,
            type:'warning',
            title:title
        })
        }else{
            setMessage({
                message:title,
                type:'warning',
            })
        }
    }

    const info = (title:string, message?:string) => {
        if(title && message){
         
        setMessage({
            message:message,
            type:'info',
            title:title     
        })
        }else{
            setMessage({
                message:title,
                type:'info',
            })
        }
    }

    let value:INotifyValue = {message:message, success:success, error:error, warning:warning, info:info, setMessage:setMessage}

    return <NotifyContext.Provider value={value}>{children}</NotifyContext.Provider>;
}

export function useNotify() {
    return useContext(NotifyContext);
}
