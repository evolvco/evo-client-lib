
export interface StoreFactory {
    getStore(name:string): DataStore;
    getMap(): StoreMap
    connect(params:StoreParams): Promise<void>;
    disconnect(name:string): Promise<void>;
}

export interface StoreMap {
    [name:string]: DataStore
}

export interface StoreParams {
    name: string;
    uri?: string;
}

export interface DataStore extends StoreParams {
    db: any;
    dataType: DataTypes;
    connect(): Promise<void>;
    disconnect(): Promise<void>;
}

export type DataTypes = "Dexie"
