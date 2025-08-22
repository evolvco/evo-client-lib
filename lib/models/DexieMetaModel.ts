import ObjectID from "bson-objectid";
import { DexieModel } from "./DexieModel"
import { Attributes } from "../types/models/ModelAdaptor.types";

export class DexieMetaModel extends DexieModel {
    
    async load(){
        let atts = this.attributes()
        let db = this.dataStore?.db

        db.version(1).stores({
            //todo add to the list
            [this.collection]: 'id, name, plural, collection, database, recordName'
        });

        this.model=db.table(this.collection) 
    }

    async create(atts:Attributes){
        let res = await this.model.where({collection:atts.collection}).toArray()

        if(res.length>0){
            console.log(`${this.collection} meta model record already exists. skipping it... `)
            return
        }
        let pld = {...atts, id:ObjectID().toHexString()}
        let rec = await this.model.add(pld)
        console.log(`created new meta model record: ${atts.name}`)
        return rec
    }
}

