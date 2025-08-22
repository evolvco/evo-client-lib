export interface BuilderParams {
    collection: string;
    id?: string;
    method: string;
    path: string;
    query?: string;
    body?: any;
    secure?: boolean;
}

export interface AuthCredentials {
    username: string;
    password: string;
}