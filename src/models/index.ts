import { StoreFactory, ModelFactory} from "@lib/models"
import { metaStore, appStore } from "./stores"
import {meta} from './meta'
import {ctx_message} from './ctx_message'
import {ctx_topic} from './ctx_topic'

export * from './ModelView'

export async function connect(){
    
    //setup some databases
    await StoreFactory.connect(metaStore)
    await StoreFactory.connect(appStore)

    //load meta model
    await ModelFactory.create(meta)

    //load app models
    await ModelFactory.create(ctx_message)
    await ModelFactory.create(ctx_topic)
}
