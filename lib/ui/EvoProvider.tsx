import { NotifyProvider } from "./Notify";
import { AuthProvider } from "../auth";
import { SocketProvider } from "../ws";

import '@ui/main.css'

export type EvoProviderProps = {
    children: React.ReactNode
}

export function EvoProvider({ children }: EvoProviderProps) {
    return (
        <NotifyProvider>
            <AuthProvider>
                <SocketProvider>
                    {children}
                </SocketProvider>
            </AuthProvider>
            <span className="w-1/2 w-1/3 w-1/4 w-3/4 w-2/3 mx-4"></span>
        </NotifyProvider>
    )
}