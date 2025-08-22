import {DexieModel} from './DexieModel'
import {DexieMetaModel} from './DexieMetaModel'
import { Meta, ModelMap, ModelAdaptor } from '../types/models/ModelAdaptor.types'
import { StoreFactory } from './StoreFactory'

let models: ModelMap = {}
let metaModel:ModelAdaptor
 
export function meta(): ModelAdaptor {
    return metaModel  
}

export function modelMap(){
    return models
}

export async function create(atts: Meta): Promise<ModelAdaptor> {
    const {name, database, mixins} = atts
    const dataStore = atts.dataStore || StoreFactory.getStore(database)

    if(dataStore.dataType==="Dexie" ){
        if(mixins && mixins.includes("meta")){
            metaModel = new DexieMetaModel(atts)
            await metaModel.load()
            return metaModel
        }else{
            models[name] = new DexieModel(atts)  
            await models[name].load()
            return models[name]
        }
    }
    
    throw new Error(`${name} schema must choose a database`)
}

export function destroy(name: string) {
    DexieModel.destroy(name)
    delete models[name]
}

export function model(name: string) {
    return models[name]
}