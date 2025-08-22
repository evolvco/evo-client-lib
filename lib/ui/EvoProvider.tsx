import { createTheme, localStorageColorSchemeManager, MantineProvider } from "@mantine/core";
import { NotifyProvider } from "./Notify";
import { AuthProvider } from "../auth";
import { SocketProvider } from "../ws";

import '@mantine/core/styles.css';

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