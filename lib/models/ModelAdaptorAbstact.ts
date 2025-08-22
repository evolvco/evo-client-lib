import { Meta, ModelAdaptor, ObjectId, AsyncRecord, Records, Mixin, Attributes, Hooks, Actions, Schema  } from "../types/models/ModelAdaptor.types"
import pluralize from 'pluralize'
import { DataStore } from "../types/models/StoreAdapter.types";
import { StoreFactory } from "./StoreFactory";
import { Query } from "../types/models/QueryAdaper.types";

function fillHooks(hooks={}):Hooks {
    return {...{
        'pre_save': '',
        'post_save': '',
        'pre_remove': '',
        'post_remove': '',
        'read_vo': ''
    }, ...hooks}
}

//todo deep merge actions
function fillActions(actions={}):Actions {
    return {...{
      create: {
        order: [],
        tags_order: [],
        tags_display: "none",
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
        service: {
            populate: [],
            path: `/api/:collection/:id`,
            method: "PUT",
            secure: true
        }
      },
      remove: {
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
 
    count(q?:Query) {
        console.warn('you should impliment this')
        return Promise.resolve(0)
    }
    
    find(q?:Query): Promise<Records>{
        console.warn('you should impliment this')
        return Promise.resolve([])
    }

    findOne(q?:Query): AsyncRecord{
        console.warn('you should impliment this')
        return Promise.resolve(undefined)
    }

    findById(id: ObjectId): AsyncRecord{
        console.warn('you should impliment this')
        return Promise.resolve(undefined)
    }

    create(atts:object): AsyncRecord{
        console.warn('you should impliment this')
        return Promise.resolve(undefined)
    }

    async createMany(attsList: Array<object>): Promise<Records>{
        let res:Records = []
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

    update(q: Query, atts: object){
        console.warn('you should impliment this')
        return Promise.resolve(undefined)
    }

    async updateMany(q: Query, atts: object): Promise<Records>{
        const recs:Records = await this.find(q)
        let res:Records = []
        const fns = recs.map(async ({id})=>{
            let rec = await this.updateById(id, atts)
            if(rec) res.push(rec)
        })  
        await Promise.all(fns)
        return res
    }

    updateBulk(q: Query, atts:object){
        console.warn('you should impliment this')
    }

    updateById(id: ObjectId, atts:object){
        console.warn('you should impliment this')
        return Promise.resolve(undefined)
    }

    remove(q:Query):AsyncRecord{
        console.warn('you should impliment this')
        return Promise.resolve(undefined)
    }

    async removeMany(q:Query): Promise<Records>{
        const recs = await this.find(q)
        let res:Records = []
        const fns = recs.map(async ({id})=>{
            let rec = await this.removeById(id)
            if(rec) res.push(rec)
        })  
        await Promise.all(fns)
        return res
    }

    removeById(id:ObjectId):AsyncRecord{
        console.warn('you should impliment this')
        return Promise.resolve(undefined)
    }

    removeBulk(q:Query){
        console.warn('you should impliment this')
    }

    static destroy(name:string) {
        console.warn('you should impliment this')
    }
}

