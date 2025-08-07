import { useState, useContext, createContext } from 'react'
import { Alert } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import { capitalize } from '@lib/utils'

export interface INotifyType {
    [key: string]: string
}

export interface INotifyValue {
    message:INotifyType,
    setMessage:Function
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

    let value:INotifyValue = {message:message, setMessage:setMessage}

    return <NotifyContext.Provider value={value}>{children}</NotifyContext.Provider>;
}

export function useNotify() {
    return useContext(NotifyContext);
}
