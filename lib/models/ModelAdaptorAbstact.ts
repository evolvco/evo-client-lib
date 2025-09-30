import type { Meta, Attributes, ModelAdaptor, ObjectId, AsyncModelRecord, ModelRecords, Mixin, DataStore, Hooks, Actions, Schema, SingleQuery, ManyQuery } from "../types"
import pluralize from 'pluralize'
import { StoreFactory } from "./StoreFactory";

function fillHooks(hooks: Hooks = {}): Hooks {
    return {
        ...{
            'pre_save': '',
            'post_save': '',
            'pre_remove': '',
            'post_remove': '',
            'read_vo': ''
    }, ...hooks}
}

//todo deep merge actions
function fillActions(actions: any = {}): Actions {
    return {...{
      create: {
        order: [],
        tags_order: [],
        tags_display: "none",
        notify: {},
        service: {
          populate: [],
          path: `/api/:collection`,
          method: "POST",
          secure: true
        }
      },
      collection: {
        order: [],
        tags_order: [],
        notify: {},
        service: {
          populate: [],
          path: `/api/:collection`,
          method: "GET",
          secure: true
        }
      },
      detail: {
        order: [],
        tags_order: [],
        tags_display: "none",
        notify: {},
        service: {
            populate: [],
            path: `/api/:collection/:id`,
            method: "GET",
            secure: true
        }
      },
      update: {
        order: [],
        tags_order: [],
        tags_display: "none",
        notify: {},
        service: {
            populate: [],
            path: `/api/:collection/:id`,
            method: "PUT",
            secure: true
        }
      },
      remove: {
        notify: {},
        service: {
          populate: [],
          path: `/api/:collection/:id`,
          method: "DELETE",
          secure: true
        }
      }
    }, ...actions}
}

export class ModelAdaptorAbstact implements ModelAdaptor {

    id?: ObjectId | undefined;
    name: string;
    plural: string;
    collection: string;
    dataStore?: DataStore;
    database: string;
    recordName: string;
    description?: string;
    socket_support?: boolean | undefined;
    tags?: string[] | undefined;
    order?: string[] | undefined;
    mixins?: Mixin[] | undefined;
    hooks: Hooks;
    actions: Actions;
    schema: Schema;
    model!: any;

    constructor(atts: Meta ){
        let {name, plural, collection, database, recordName, dataStore, hooks, actions, schema, ...rest} = atts
        
        this.name = name
        this.plural = plural || pluralize(name)
        this.dataStore = dataStore || StoreFactory.getStore(database)
        this.database = database
        this.collection = collection || pluralize(name)
        this.recordName = recordName || (schema.name? 'name' : 'id')
        this.hooks = fillHooks(hooks)
        this.actions = fillActions(actions)
        this.schema = schema

        Object.assign(this, rest)
    }

    attributes(): Meta { //todo: keep as proper json i think
        return {
            name:this.name, 
            plural:this.plural, 
            database:this.database, 
            collection:this.collection, 
            recordName:this.recordName, 
            hooks:this.hooks,
            actions:this.actions,
            schema:this.schema
        }
    }

    load(){
        console.warn('you should impliment the underling model')
        this.model={}
        return Promise.resolve()
    }


    validate(atts:Attributes) {
        return Promise.resolve()
    }

    validateCreate(atts:Attributes) {
        return this.validate(atts)
    }

    async validateUpdate(id:ObjectId, atts: Attributes) {
        let rec = await this.findById(id)
        if(rec){
            let merged:Attributes = {}
            Object.keys(rec).forEach((k)=>{
                merged[k] = atts[k] === undefined? rec[k] : atts[k]
            })
            return this.validate(merged)
        }
    }
 
    count(q?:ManyQuery) {
        console.warn('you should impliment this')
        return Promise.resolve(0)
    }
    
    find(q?:ManyQuery): Promise<ModelRecords>{
        console.warn('you should impliment this')
        return Promise.resolve([])
    }

    findOne(q?:SingleQuery): AsyncModelRecord{
        console.warn('you should impliment this')
        return Promise.resolve(undefined)
    }

    findById(id: ObjectId): AsyncModelRecord{
        console.warn('you should impliment this')
        return Promise.resolve(undefined)
    }

    create(atts:object): AsyncModelRecord{
        console.warn('you should impliment this')
        return Promise.resolve(undefined)
    }

    async createMany(attsList: Array<object>): Promise<ModelRecords>{
        let res:ModelRecords = []
        const fns = attsList.map(async (atts)=>{
            let rec = await this.create(atts)
            if(rec) res.push(rec)
        })  
        await Promise.all(fns)
        return res
    }

    createBulk(attsList: Array<object>){
        console.warn('you should impliment this')
    }

    update(q: SingleQuery, atts: object){
        console.warn('you should impliment this')
        return Promise.resolve(undefined)
    }

    async updateMany(q: ManyQuery, atts: object): Promise<ModelRecords>{
        const recs:ModelRecords = await this.find(q)
        let res:ModelRecords = []
        const fns = recs.map(async ({id})=>{
            let rec = await this.updateById(id, atts)
            if(rec) res.push(rec)
        })  
        await Promise.all(fns)
        return res
    }

    updateBulk(q: ManyQuery, atts:object){
        console.warn('you should impliment this')
    }

    updateById(id: ObjectId, atts:object){
        console.warn('you should impliment this')
        return Promise.resolve(undefined)
    }

    remove(q:SingleQuery):AsyncModelRecord{
        console.warn('you should impliment this')
        return Promise.resolve(undefined)
    }

    async removeMany(q:ManyQuery): Promise<ModelRecords>{
        const recs = await this.find(q)
        let res:ModelRecords = []
        const fns = recs.map(async ({id})=>{
            let rec = await this.removeById(id)
            if(rec) res.push(rec)
        })  
        await Promise.all(fns)
        return res
    }

    removeById(id:ObjectId):AsyncModelRecord{
        console.warn('you should impliment this')
        return Promise.resolve(undefined)
    }

    removeBulk(q:ManyQuery){
        console.warn('you should impliment this')
    }

    static destroy(name:string) {
        console.warn('you should impliment this')
    }
}

