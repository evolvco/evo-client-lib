import { meta, model, create } from '@lib/models/ModelFactory'
import {  Attributes, FieldType } from '@lib/models/ModelAdaptor.types'
import { appStore } from '@/models/stores'
export * from './meta'

//import { z } from "zod";
//import { zodFunction } from "openai/helpers/zod";
//const tools = [
//    zodFunction({ name: "getWeather", parameters: GetWeatherParameters }),
//];

export const callFunction = async (name: string, args: any) => {
    console.log('callFunction', name, args)
    if(name==='get_meta_models'){
        let models = await meta().find()
        if(args.model && models.find((m:any)=>m.name===args.model)){
            models = [models.find((m:any)=>m.name===args.model) as any]
        }
        if(args.format==='json'){
            return '```json\n' + JSON.stringify(models, null, 2) + '\n```'
        }
        if(args.format==='list' || true){
            let ul:string[] = []
            ul.push('\n')
            models.map((m:any)=>{
                ul.push(' * ' + m.name + '\n')
                if(args.fields){
                    Object.keys(m.schema).forEach((f:any)=>{
                        ul.push('   * ' + f + ' (' + m.schema[f].type + ')\n')
                    })
                }
            })
            return ul.join('\n')
        }
    }
    if(name==='find_model_records'){
        let m = await model(args.model).find()
        if(args.count){
            return m.length
        }
        if(args.format==='table'){
            let table:string[] = []
            table.push('\n')
            table.push('| '+ Object.keys(model(args.model).schema).join(' | ') + '|')
            table.push('| '+ Object.keys(model(args.model).schema).map(()=>'---').join(' | ') + '|')
            m.forEach((r:any)=>{
                table.push('| '+ Object.keys(r).map((k:any)=>r[k]).join(' | ') + '|')
            })
            return table.join('\n')
        }
        return '```json\n' + JSON.stringify(m, null, 2) + '\n```'
    }
    if(name==='create_meta_model'){

        let schema:Attributes = {}
        args.fields.forEach((f:any)=>{
            schema[f.name] = {
                type: f.type||FieldType.String,
                required: f.required||false,
                index: f.index||false
            }
        })
        let m = await create({
            name: args.model,
            database: appStore.name,
            schema: {...{
                name: {
                    type: FieldType.String,
                    required: true,
                    index:true
                },
                description: {
                    type: FieldType.String,
                },
                createdAt: {
                    type: FieldType.Date,
                    index:true
                }
            }, ...schema}
        })
        return '```json\n' + JSON.stringify(m, null, 2) + '\n```'
    }
    console.log(name, args)
    return 'ok from callFunction'
}