import type { DataStore, StoreFactoryType, StoreMap } from "../types"

let stores:StoreMap = {}

export const StoreFactory:StoreFactoryType = {
    async connect(store:DataStore) {
        stores[store.name]=store
        await store.connect()
    },
    async disconnect(name:string){
        if(name){
            await stores[name]?.disconnect()
            return
        }
        let fns = Object.keys(stores).map( async(name)=>{
            await stores[name]?.disconnect()
        })
        await Promise.all(fns)
    },
    getStore(name:string):DataStore {
        return stores[name]
    },
    getMap(): StoreMap {
        return stores
    }
}