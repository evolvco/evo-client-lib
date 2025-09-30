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

export interface FindPageRecordsParams {
    startRow: number;
    endRow: number;
    sortModel?: Array<{colId: string; sort: string}>;
    filterModel?: Record<string, {type: string; filterType: string; filter: any}>;
  }
  