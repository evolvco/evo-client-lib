declare module 'evo-client-lib' {
  export function setRestDomain(domain: string): void;
  export function setSocketDomain(domain: string): void;
  export function AuthProvider(props: { children: React.ReactNode }): JSX.Element;
  export function SocketProvider(props: { children: React.ReactNode }): JSX.Element;
  export function RequireAuth(props: {children: React.ReactNode, onFailure: function }): JSX.Element;
  export function NotifyProvider(props: { children: React.ReactNode }): JSX.Element;
  export function EvoProvider(props: { children: React.ReactNode }): JSX.Element;
  export function useMeta(): any;
  export function useAuth(): any;
  export function useNotify(): any;
  export function fetchMeta(): any;
  export const utils: {
    string: {
      toCamelCase(str: string): string;
      toSpaceCase(str: string): string;
      toUnderscoreCase(str: string): string;
      toSlugCase(str: string): string;
      capitalize(str: string): string;
      initialize(str: string): string;
    }
  };
  export const models;
  export const LoginForm;
  export const ui;
  export const Toaster;
  export const Notify;
  export const TriLayout;
} 