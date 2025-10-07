import {
    ModelFactoryType,
    Schema,
    ModelRecord,
    Attributes, 
    StoreFactoryType,
    DataStore,
    ChildrenProps,
    UseModelParams,
    ModelContextType,
    MetaModelContextType,
    SocketContextType,
    NotifyProps,
    RequireAuthProps,
    LoginFormProps,
    AuthCredentials,
    BuilderParams,
    MetaProviderProps,
    SingleQuery,
    ManyQuery,
    RecordSet,
    FindPageRecordsParams,
    RouteContextType,
    RouteProviderProps,
    ViewProps,
    PrefProviderProps,
    TriPanelProps,
    ProtectedProviderProps,
    ModelGridProps,
    ModelDetailProps,
    ModelAttributeProps,
    ModelTemplateProps,
    ToasterProps,
    AppSidebarProps,
    RouterProps,
    ModelRoutesProps,
    ListFilterProps,
    WhereClause,
    ContainerProps,
    ModelFormProps,
    ModelFormFieldsProps
} from './types';

import {
    JSX
} from 'react';

//types
export * from './types'

//Config
export function setRestDomain(domain: string): void;
export function setSocketDomain(domain: string): void;
export function getRestDomain(): string;
export function getSocketDomain(): string;
//Auth
export function getAccessToken(): string;
export function setToken(token: string): void;
//Providers
export function AuthProvider(props: ChildrenProps): JSX.Element;
export function SocketProvider(props: ChildrenProps): JSX.Element;
export function NotifyProvider(props: ChildrenProps): JSX.Element;
export function EvoProvider(props: ChildrenProps): JSX.Element;
export function MetaProvider(props: MetaProviderProps): JSX.Element;
export function RouteProvider(props: RouteProviderProps): JSX.Element;
export function PrefProvider(props: PrefProviderProps): JSX.Element;
export function ProtectedProvider(props: ProtectedProviderProps): JSX.Element;
export function Toaster(): JSX.Element;
//Hooks
export function useMeta(params?: { onError?: Function }): MetaModelContextType;
export function useAuth(): any;
export function useNotify(): any;
export function fetchMeta(): any;
export function useModel(params: UseModelParams): ModelContextType;
export function useSocket(): SocketContextType;
export function useModelRoutes(): RouteContextType;
export function useModelView(params: ViewProps): ModelRecord;
export function toast(message?: string, opts?: {action?: {label: string, onClick: () => void}}): void;
export namespace toast {
    export function success(message?: string): void;
    export function message(message?: string, opts?: {description?: string}): void;
    export function error(message?: string): void;
    export function warning(message?: string): void;
    export function info(message?: string): void;

}
//components
export function Container(props: ContainerProps): JSX.Element;
export function Toaster(props: ToasterProps): JSX.Element;
export function LoginForm(props: LoginFormProps): JSX.Element;
export function RequireAuth(props: RequireAuthProps): JSX.Element;
export function Notify(props: NotifyProps): JSX.Element;
export function Loader(): JSX.Element;
export function TriPanel(props: TriPanelProps): JSX.Element;
export function View(props: ViewProps): JSX.Element;
export function ModelRoutes(): JSX.Element;
export function RouteView(props: ViewProps): JSX.Element;
export function ModelGrid(props: ModelGridProps): JSX.Element;
export function ModelDetail(props: ModelDetailProps): JSX.Element;
export function ModelAttribute(props: ModelAttributeProps): JSX.Element;
export function ModelTemplate(props: ModelTemplateProps): JSX.Element;
export function Router(props: RouterProps): JSX.Element;
export function ModelRoutes(props: ModelRoutesProps): JSX.Element;
export function ModelForm(props: ModelFormProps): JSX.Element;
export function ModelFormFields(props: ModelFormFieldsProps): JSX.Element;
export function AppSidebar(props: AppSidebarProps): JSX.Element;
export function ListFilter(props: ListFilterProps): JSX.Element;
export function ThemeToggle(): JSX.Element;
export function Dialog(props: DialogProps): JSX.Element;
//services
export function pulse(): Promise<any>;
export function login(cred: AuthCredentials): Promise<any>;
export function getUser(): Promise<any>;
export function refresh(refresh_token: string): Promise<any>;
export function release(): Promise<any>;
export function resolve(props: ViewProps): Promise<ModelRecord>;
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
}
//Models
export const ModelFactory: ModelFactoryType
export const StoreFactory: StoreFactoryType
export const DexieStore: DataStore
export const metaSchema: Schema
export function builder(params: BuilderParams): Promise<any>;
export function find(collection: string, query?: ManyQuery): Promise<RecordSet>;
export function findOne(collection: string, query?: SingleQuery): Promise<ModelRecord>;
export function findById(collection: string, id: string): Promise<ModelRecord>;
export function create(collection: string, atts: Attributes): Promise<ModelRecord>;
export function update(collection: string, id: string, atts: Attributes): Promise<ModelRecord>;
export function remove(collection: string, id: string): Promise<ModelRecord>;
export function removeMany(collection: string, query?: ManyQuery): Promise<void>;
export function findPageRecords(collection: string, where: WhereClause, { startRow, endRow, sortModel, filterModel }: FindPageRecordsParams): Promise<RecordSet>
