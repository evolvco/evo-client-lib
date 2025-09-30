import {useState, useEffect} from 'react'
import * as services from './services'
import {useSocket} from '../ws'
import type { ManyQuery, RecordSet, ModelContextType } from '../types'

interface UseModelParams {
  model: string
  query?: ManyQuery
  onError?: (error: any) => void
}

export function useModel(params: UseModelParams) {
  const [models, setModels] = useState<RecordSet|undefined>()
  const [loadingModels, setLoadingModels] = useState(true)
  const {ws} = useSocket()
  
  useEffect(()=>{
    const fn = (ev: any) => {
      const {resource, action, message} = JSON.parse(ev.data)
      if(resource===params.model && ['create','update','delete'].includes(action)){
        findModels(params.query as ManyQuery)
      }
    }

    ws?.addEventListener('message', fn)
    return ()=>{
      ws?.removeEventListener('message', fn)
    } 
  }, [params.model, params.query])

  useEffect(()=>{
    findModels(params.query as ManyQuery)
  },[params.model, params.query])

  async function findModels(query: ManyQuery){    
    try{
      setLoadingModels(true)
      const recSet = await services.find(params.model, query)
      setLoadingModels(false)
      setModels(recSet)
    }catch(e){
      console.error(e)
      setLoadingModels(false)
      params?.onError?.(e)
    }
  }

  async function createModel(atts: any){    
    try{
      const rec = await services.create(params.model, atts)
      //if(!params.preventUpdate){
        await findModels(params.query as ManyQuery)
      //}
      return rec
    }catch(e){
      console.error(e)
      params?.onError?.(e)
    }
  }

  let ctx:ModelContextType = {
    recordSet:models, 
    loading:loadingModels, 
    find:findModels,
    create:createModel
  }

  return ctx
}