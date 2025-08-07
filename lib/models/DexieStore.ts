import { DataStore, DataTypes, StoreParams } from "./StoreAdapter.types";
import Dexie from "dexie"

export class DexieStore implements DataStore {
    dataType: DataTypes;
    name: string;
    uri?: string | undefined;
    db!: any;

    constructor(params:StoreParams){
        this.name = params.name
        this.uri = params.uri || params.name
        this.dataType = DataTypes.Dexie
    }

    async connect() {
        this.db = new Dexie(this.name) 
        return 
    }
    
    async disconnect() {
        this.db=undefined
        return 
    }
}