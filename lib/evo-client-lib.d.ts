import { 
    ModelFactory, 
    StoreFactory, 
    DataStore, 
    Schema, 
    Records, 
    Record, 
    Attributes 
} from './types/models/ModelAdaptor.types';

import { 
    ChildrenProps, 
    UseModelParams, 
    ModelContextType,
    MetaModelContextType, 
    SocketContextType, 
    NotifyProps, 
    RequireAuthProps, 
    TriLayoutProps,
    LoginFormProps 
} from './types/components.types';

import { 
    JSXElement 
} from 'react';

import {
    AuthCredentials,
    BuilderParams
} from './types/models/services.types';

declare module 'evo-client-lib' {
    //Config
    export function setRestDomain(domain: string): void;
    export function setSocketDomain(domain: string): void;
    export function getRestDomain(): string;
    export function getSocketDomain(): string;
    //Auth
    export function getAccessToken(): string;
    export function setToken(token: string): void;
    //Providers
    export function AuthProvider(props: ChildrenProps): JSXElement;
    export function SocketProvider(props: ChildrenProps): JSXElement;
    export function NotifyProvider(props: ChildrenProps): JSXElement;
    export function EvoProvider(props: ChildrenProps): JSXElement;
    //Hooks
    export function useMeta(params?: { onError?: Function }): MetaModelContextType;
    export function useAuth(): any;
    export function useNotify(): any;
    export function fetchMeta(): any;
    export function useModel(params: UseModelParams): ModelContextType;
    export function useSocket(): SocketContextType;
    //components
    export function LoginForm(props: LoginFormProps): JSXElement;
    export function RequireAuth(props: RequireAuthProps): JSXElement;
    export function Toaster(): JSXElement;
    export function Notify(props: NotifyProps): JSXElement;
    export function Loader(): JSXElement;
    export function TriLayout(props: TriLayoutProps): JSXElement;
    //services
    export function pulse(): Promise<any>;
    export function login(cred: AuthCredentials): Promise<any>;
    export function getUser(): Promise<any>;
    export function refresh(refresh_token: string): Promise<any>;
    export function release(): Promise<any>;

    //Utils
    export namespace utils {
        export function toCamelCase(str: string): string;
        export function toSpaceCase(str: string): string;
        export function toUnderscoreCase(str: string): string;
        export function toSlugCase(str: string): string;
        export function capitalize(str: string): string;
        export function initialize(str: string): string;
        export function abbreviate(value: number): string;
        export function msToTimeString(ms: number): string;
        export function deepMerge(obj1: Attributes, obj2: Attributes): Attributes;
    };
    //Models
    export namespace models {
        export const ModelFactory: ModelFactory
        export const StoreFactory: StoreFactory
        export const DexieStore: DataStore
        export const metaSchema: Schema
        export function builder(params: BuilderParams): Promise<any>;
        export function find(collection: string, query?: any): Promise<Records>;
        export function findOne(collection: string, query?: any): Promise<Record>;
        export function findById(collection: string, id: string): Promise<Record>;
        export function create(collection: string, atts: Attributes): Promise<Record>;
        export function update(collection: string, id: string, atts: Attributes): Promise<Record>;
        export function remove(collection: string, id: string): Promise<Record>;
        export function removeMany(collection: string, query?: any): Promise<Records>;
        export function useModel(params: UseModelParams): ModelContextType;
    }

    export const ModelFactory: ModelFactory;
}