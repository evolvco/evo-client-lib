import { ReactNode } from "react";
import { Records } from "./models";

export interface ChildrenProps {
    children: ReactNode
}

export interface ErrorParams {
    onError?: (error: any) => void
}

export interface NotifyProps {
    mt?: string,
    type?: string,
    title?: string,
    onClose?: () => {} | null,
    children: ReactNode,
    open?: boolean
}

export interface RequireAuthProps {
    children: ReactNode,
    onFailure: () => void,
    loader: ReactNode,
    loaderClass: string
}

export interface TriLayoutProps {
    children:  ReactNode,
    leftPanel: ReactNode,
    rightPanel: ReactNode
}

//hooks //providers
export interface UseModelParams {
    model: string
    query?: any
    onError?: (error: any) => void
}

export interface SocketProviderProps {
    children: ReactNode;
}

export interface SocketContextType {
    ws: WebSocket | null;
    isReady: boolean;
    sendMessage: (message: string) => void;
    messages: any[];
}

export interface MetaModelContextType {
    metaModels: any[];
    loadingMetaModels: boolean;
    setMetaModels: (metaModels: any[]) => void;
}

export interface ModelContextType {
    recordSet: Records
    loading: boolean
    find: Function
    create: Function
}

export interface NotifyType {
    [key: string]: string
}

export interface NotifyValue {
    message: NotifyType,
    setMessage: Function,
    success: Function,
    error: Function,
    warning: Function,
    info: Function
}

export interface LoginFormProps {
    onSuccess: Function,
    onFailure: Function,
    formClass: string,
    errorClass: string,
    labelClass: string,
    inputClass: string,
    headerClass: string,
    footerClass: string,
    submitClass: string
}