import { RequireAuth } from "@lib/auth";
import { MetaProvider } from "@lib/meta";
import { RouteProvider } from "@lib/routes";
import { ProtectedProviderProps } from "@lib/types";
import { useNavigate } from "react-router-dom";
import { PrefProvider } from "@lib/components/hooks/PrefProvider";

export function ProtectedProvider({ children }: ProtectedProviderProps) {
    const navigate = useNavigate();
    return (<RequireAuth
            onFailure={()=>navigate('/login')}
        >
            <MetaProvider>
                <PrefProvider>
                    <RouteProvider>
                        {children}
                    </RouteProvider>
                </PrefProvider>
            </MetaProvider>
        </RequireAuth>)
}