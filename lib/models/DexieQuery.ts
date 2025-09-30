import { Collection } from "dexie";
import { model } from "./ModelFactory";
import type { ModelAdaptor, ModelRecords, ModelRecord, Attributes, ManyQuery, QueryBuilder as QB, WhereKey } from "../types"

export class QueryBuilder implements QB {
    
    model: ModelAdaptor;
    collection!: Collection;
    records: ModelRecords;
    query!: ManyQuery;
    cursor!: any;

    constructor(model:ModelAdaptor)  {
        this.model = model
        this.cursor = model.model
        this.records = []
    }
    async parse(q?:ManyQuery): Promise<QueryBuilder>{
        
        if(!q) {
            this.records = this.cursor.toArray()
            return this
        }
        this.query = q

        if(q.where){
            this.processWhere()
        } else{
            this.collection = this.cursor.toCollection()
        }
        
        let col = this.collection

        let recs:Attributes[]
    
        if(q.sort){
            let srt = Array.isArray( q.sort) ? Array(q.sort).join(' '):q.sort
            recs = await col.sortBy(srt as string)
            if(q.skip){
                recs.splice(0,q.skip)
            }
            if(q.limit){
                recs.length=q.limit
            }
            this.records = recs as ModelRecords  
            return this  
        }

        if(q.skip){
            col = col.offset(q.skip)
        }

        if(q.limit){
            col = col.limit(q.limit)
        }

        recs = await col.toArray()
        this.records = recs as ModelRecords

        if(q?.populate){
            await this.processPopulate()
        }
        if(q?.select){
            const selectFields = Array.isArray(q.select) ? q.select : [q.select]

            recs = recs.map((r)=>{
                let nrec:Attributes = {}
                selectFields.forEach((s)=>{
                    nrec[s]=r[s]
                })
                return nrec
            })
            this.records = recs as ModelRecords
        }
        return this
    }

    processWhere(): void {
        let q:string | WhereKey | undefined = this.query.where

        if(q && typeof q === 'object' && 'id' in q && Array.isArray(q.id)){
            this.collection = this.cursor.where('id').anyOf(q.id) 
            return
        }

        this.collection = this.cursor.where(q)
    }

    async processPopulate(){
        let records = this.records
        let populate = this.query.populate
        let schema = this.model.schema
        if(!populate.length) return
   
        type PostPopulate = {
            att:string,
            model:ModelAdaptor    
        }

        let postPopulates:PostPopulate[] = []
        let flds = populate.constructor===Array ? populate : populate.split(',')

        flds.forEach((fld:string)=>{
            let sch = schema[fld]
            let modNm = Array.isArray(sch)? sch[0].ref : sch.ref
            if(modNm){
                let Mod = model(modNm)
                if(Mod && Mod.database){
                    postPopulates.push({att:fld, model:Mod})
                }
            }
        })

        let maps:Attributes = {}
        let fns = postPopulates.map(async (pop:PostPopulate)=>{
            maps[pop.att]={}
            
            let ids:Attributes = {}
            records.forEach((r:ModelRecord)=>{
                if(Array.isArray(r[pop.att])){
                    let aaa  = r[pop.att] as Array<string>
                    aaa.forEach((re, i)=>{
                        ids[re as string]=true
                    })
                }else{
                    ids[r[pop.att]as string]=true
                }
            })
            
            let relms = await pop.model.find({where:
                {id:Object.keys(ids)}
            })
            relms.forEach((r)=>{
                let rc = maps[pop.att] as Attributes
                rc[r.id.toString()]=r
            })  
        })
        await Promise.all(fns)

        let recs = records.map((r)=>{
            Object.keys(maps).forEach((att)=>{
                if(r[att]){
                    if(Array.isArray(r[att])){
                        r[att] = r[att].map((rr)=>{
                            let rc = maps[att] as Attributes
                            return rc[rr.toString()]
                        })
                    }else{
                        let rc = maps[att] as Attributes
                        r[att]= rc[r[att].toString()]
                    }
                }
            })
            return r
        })
        this.records = recs
    }

    toRecords(): ModelRecords {
        return this.records
    }
}


        
        
 
        