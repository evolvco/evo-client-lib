import { ModelAdaptorAbstact } from "./ModelAdaptorAbstact"
import type { ObjectId ,ModelAdaptor, Attributes, Field, ManyQuery, SingleQuery} from "../types"
import { Table } from "dexie"
import { meta } from "./ModelFactory"
import ObjectID from "bson-objectid"
import {QueryBuilder} from "./DexieQuery"

export class DexieModel extends ModelAdaptorAbstact {
    
    declare model: Table

    async load(){
        let atts = this.attributes() 
        let metaModel = meta()
        
        await metaModel.create(atts as unknown as Attributes)

        let db = this.dataStore?.db
        
        //find some indexes, &uniques
        let indx:Array<string> = []
        Object.keys(atts.schema).filter((name)=>{
            let attr = atts.schema[name]
            let att = attr.constructor===Array?attr[0]: attr as Field
            //list
            if(att.type==="Array"){
                indx.push(`*${name}`)
            }
            //index
            else if(att.index){
                indx.push(name)
            }
            //unique
            else if(att.unique){
                indx.push(`&${name}`)
            }
        })
        let schema = `id, ${indx.join(', ')}`
        console.log('Dexie Schema',this.name, schema)
        await db.close()
        db.version(1).stores({
            //todo add to the list
            [this.collection]: schema 
        });
        await db.open()
        this.model=db.table(this.collection) 
    }
 
    count(q?:ManyQuery) {
        console.warn('you should impliment this')
        return Promise.resolve(0)
    }
    
    async find(q?:ManyQuery) {
        let query:QueryBuilder = new QueryBuilder(this as ModelAdaptor)
        await query.parse(q)
        return query.toRecords()
    }

    async findOne(q?:SingleQuery){
        let recs = await this.find(q)
        if(recs.length>0){
            return recs[0]
        }
    }

    findById(id: ObjectId){
        return this.model.get(id)
    }

    validate(atts:Attributes){
        let errors:Array<string> = []
        
        Object.keys(this.schema).forEach((nm)=>{
            let att = this.schema[nm] as Field
            //required
            if(att.required && (atts[nm]===undefined || atts[nm]==='')){
                errors.push(`${nm} is a Required field`)
                return
            }
            //type
            if(atts[nm]!==undefined){
                if(att.type==="Boolean" && typeof(atts[nm]) !== 'boolean'){
                    errors.push(`${nm} is of the wrong type`)
                    return
                }
            }
            //enum
            if(att.enum && att.enum.length>0 && !att.enum.includes(String(atts[nm]))){
                errors.push(`${nm} has been given an invalid value`)
                return
            }
        })
        if(errors.length){
            return Promise.reject(new Error(errors.join(' ')))
        }
        return Promise.resolve()
    }

    async create(atts:Attributes){
        try{
            await this.validateCreate(atts)
            let id = await this.model.add({...atts, id:ObjectID().toHexString()})
            let rec = await this.model.get(id)
            return rec
        }catch(e){
            throw e
        }   
    }

    createBulk(attsList: Array<Attributes>){
        console.warn('you should impliment this')
    }

    async update(q: SingleQuery, atts: Attributes){
        let res = await this.findOne(q)
        if(res?.id){
            return this.updateById(res.id, atts)
        }
    }

    updateBulk(q: ManyQuery, atts:Attributes){
        console.warn('you should impliment this')
    }

    async updateById(id: ObjectId, atts:Attributes){
        try {
            await this.validateUpdate(id, atts)
            let res = await this.model.update(id, atts)
            if(res){
                return this.findById(id)
            }
        }catch(e){
            throw e
        }
    }

    async remove(q:SingleQuery){
        let rec = await this.findOne(q)
        console.log(999,rec)
        if(rec){
            await this.model.delete(rec.id)
            return rec  
        }
    }

    removeById(id:ObjectId){
        return this.remove({where:{id}})
    }

    removeBulk(q:ManyQuery){
        console.warn('you should impliment this')
    }

    static destroy(name:string) {
        console.warn('you should impliment this')
    }
}

