import {useState, useEffect} from 'react'
import * as services from './services'
import {useSocket} from '../ws'
import { Query, RecordSet } from '../types'

interface UseModelParams {
  model: string
  query?: any
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
        findModels(params.query)
      }
    }

    ws?.addEventListener('message', fn)
    return ()=>{
      ws?.removeEventListener('message', fn)
    } 
  }, [])

  useEffect(()=>{
    findModels(params.query)
  },[])

  async function findModels(query: Query){    
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
        await findModels(params.query)
      //}
      return rec
    }catch(e){
      console.error(e)
      params?.onError?.(e)
    }
  }

    return {
      recordSet:models, 
      loading:loadingModels, 
      find:findModels,
      create:createModel
    }
}