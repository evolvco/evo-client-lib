import { createTheme, localStorageColorSchemeManager, MantineProvider } from "@mantine/core";
import { NotifyProvider } from "./Notify";
import { AuthProvider } from "../auth";
import { SocketProvider } from "../ws";

import '@mantine/core/styles.css';
import '@ui/main.css'

const theme = createTheme({
    fontFamily: 'Open Sans, sans-serif',
    primaryColor: 'cyan',
});

const colorSchemeManager = localStorageColorSchemeManager({
    key: 'my-app-color-scheme',
});

export type EvoProviderProps = {
    children: React.ReactNode
}

export function EvoProvider({ children }: EvoProviderProps) {
    return (
        <MantineProvider 
            theme={theme} 
            colorSchemeManager={colorSchemeManager}
            defaultColorScheme="light"
        >
            <span className="w-1/2 w-1/3 w-1/4 w-3/4 w-2/3 mx-4"></span>
                <NotifyProvider>
                    <AuthProvider>
                        <SocketProvider>
                        {children}
                    </SocketProvider>
                </AuthProvider>
            </NotifyProvider>
        </MantineProvider>
    )
}