import { ReactElement, ReactNode } from "react";
import type { Attributes, ManyQuery, Meta, ModelRecord, FormFieldBaseProps, RecordSet } from "./";
import type { PanelGroup as ResizablePanelGroup } from "react-resizable-panels";
import type { Panel as ResizablePanel } from "react-resizable-panels";
import type { PanelResizeHandle as ResizableHandle } from "react-resizable-panels";
export type { ToasterProps } from 'sonner'

export interface ChildrenProps {
    children: ReactNode
}

export interface DialogProps {
    title?: string;
    description?: string;
    children: React.ReactNode;
    open?: boolean;
    onToggle?: string;
    setOpen?: (open: boolean) => void;
    trigger?: React.ReactNode;
    showFooter?: boolean;
  }

export interface SidebarsMenuSectionNavProps {
    items: NavItemType[];
    className?: string;
    style?: React.CSSProperties;
}

  export interface NavItemType {
    id: string;
    is_active?: boolean;
    route?: {
        path: string;
        route_params?: string[];
    };
    parent?: NavItemType;
    name: string;
    icon?: string;
    url?: string;
    items?: NavItemType[];
}

export interface ContainerProps {
    children: ReactNode;
    style?: React.CSSProperties;
    className?: string;
    dir?: 'col' | 'row';
}

export interface ModelGridProps extends FormFieldBaseProps {
    meta: Meta;
    where?: Record<string, any>;
    handleEdit?: (id: string) => void;
    dispatchSelect?: string;
    rowClickPath?: string;
    height?: string;
}
export interface ModelDetailProps {
    className?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    meta: any;
    on?: string;
    recId?: string;
    value?: string;
    populate?: string;
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
export interface AppSidebarProps {
    children: React.ReactNode;
    side?: 'left' | 'right';
    variant?: 'sidebar' | 'floating' | 'inset';
    header?: React.ReactNode;
    footer?: React.ReactNode;
    sectionNavItems: NavItemType[];
}

export interface ListFilterProps {
    id?: string;
    title?: any;
    subTitle?: any;
    placeholder?: string;
    onChange?: (value: string | number | boolean, opt: any) => void;
    filter?: any;
    options?: any[];
    ItemComponent?: any;
    sort?: string;
    method?: string;
    itemFn?: any;
    tagsFn?: (opt: any) => string[];
    infoFn?: (opt: any) => string;
    minCount?: number;
    member?: any;
    memberFormat?: string;
    infoMember?: string;
    className?: any;
    headerClassName?: string;
    itemClassName?: string;
    menuClassName?: string;
    onCreate?: string;
    onUpdate?: string;
    onRemove?: string;
    clearable?: boolean;
    dispatch?: string;
    tagsMember?: string;
    value?: string | number | boolean;
    style?: any;
    to?: string;
}

export interface ModelRoutesProps {
    query?: ManyQuery;
  }

export interface ModelFormFieldsProps {
    className?: string;
    style?: React.CSSProperties;
  }

export interface ModelFormProps {
    className?: string;
    children?: React.ReactNode;
    style?: React.CSSProperties;
    meta: any;
    recId?: string;
    action?: string;
    onSelect?: string;
    dispatchUpdate?: string;
    dispatchRemove?: string;
    dispatchCreate?: string;
  }

export interface RequireAuthProps {
    children: React.ReactNode
    onFailure: () => void
    loader?: React.ReactNode
    loaderClass?: string
}

export interface TriPanelProps {
    children?: ReactNode,
    leftPanel?: ReactNode,
    rightPanel?: ReactNode
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

export interface ModelAttributeProps {
    className?: string;
    style?: React.CSSProperties;
    attribute: string;
    tag?: string;
    link?: string;
}

export interface CardProps {
    title: string | React.ReactNode;
    children: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
    headerClassName?: string;
    contentClassName?: string;
    onClickPath?: string;
  }

export interface ModelFormSubmitButtonProps {
    className?: string;
    style?: React.CSSProperties;
    children?: React.ReactNode;
    action?: 'create' | 'update' | 'remove';
    [key: string]: any;
  }

export interface ModelTemplateProps {
    className?: string;
    style?: React.CSSProperties;
    template: string;
}

export interface DetailContextType {
    record?: any;
    meta?: any;
}

export interface MetaModelContextType {
    metaModels: any[];
    loadingMetaModels: boolean;
    setMetaModels: (metaModels: any[]) => void;
}

export interface RoleContextType {
    roles: ModelRecord[];
    loadRoles: () => void;
    loadingRoles: boolean;
    setRoles: (roles: ModelRecord[]) => void;
}

export interface RoleProviderProps {
    children: ReactNode;
}

export interface ModelContextType {
    recordSet?: RecordSet
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
    onSuccess?: Function,
    onFailure?: Function,
    formClass?: string,
    errorClass?: string,
    labelClass?: string,
    inputClass?: string,
    headerClass?: string,
    footerClass?: string,
    submitClass?: string
}

export interface MetaProviderProps {
    children: ReactNode;
}

export interface MetaContextType {
    metaModels: Meta[];
    loadMetaModels: () => void;
    setMetaModels: (metaModels: Meta[]) => void;
    loadingMetaModels: boolean;
}

export interface RouteContextType {
    routes: ModelRecord[];
    setRoutes: (routes: ModelRecord[]) => void;
}

export interface RouteProviderProps {
    children: ReactNode;
}

export interface PrefProviderProps {
    children: ReactNode;
}

export interface ProtectedProviderProps {
    children: ReactNode;
}

export interface PrefsContextType {
    prefs: Attributes;
    setPrefs: (prefs: Attributes) => void;
}

export interface ViewProps {
    view: string;
    params?: Attributes;
}

export interface ButtonProps {
    children: React.ReactNode;
    dispatch?: string;
    confirm?: string;
    onClick?: (...args: any[]) => void;
    variant?: "primary" | "default" | "danger" | "destructive" | "outline" | "secondary" | "ghost" | "link";
    [key: string]: any;
}

export interface ButtonGroupProps {
    className?: string;
    style?: React.CSSProperties;
    orientation?: 'horizontal' | 'vertical';
    children: ReactElement<ButtonProps>[];
  }

export interface TriPanelProps {
    children?: React.ReactNode;
    leftPanel?: React.ReactNode;
    rightPanel?: React.ReactNode;
    className?: string;
    prefEventNameLeft: string;
    prefEventNameRight: string;
    direction?: 'horizontal' | 'vertical';
    leftPanelProps?: React.ComponentProps<typeof ResizablePanel>;
    rightPanelProps?: React.ComponentProps<typeof ResizablePanel>;
    panelGroupProps?: React.ComponentProps<typeof ResizablePanelGroup>;
    leftHandleProps?: React.ComponentProps<typeof ResizableHandle>;
    rightHandleProps?: React.ComponentProps<typeof ResizableHandle>;
    leftPanelActions?: React.ReactNode;
    rightPanelActions?: React.ReactNode;
    centerPanelActions?: React.ReactNode;
    leftPanelMaxSize?: number;
    rightPanelMaxSize?: number;
    leftPanelMinSize?: number;
    rightPanelMinSize?: number;
}

export interface TooltipProps {
    content: string;
    children: React.ReactNode;
}

export interface RouterProps {
    tag?: string;
}

export interface ModelRoutesProps {
    tag?: string;
}