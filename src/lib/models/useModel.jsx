import {useState, useEffect} from 'react'
import * as services from './services'
import {useSocket} from '../ws'

export function useModel(params={}) { //{model, query, onError}
  const [models, setModels] = useState()
  const [loadingModels, setLoadingModels] = useState(true)
  const {ws} = useSocket()

  useEffect(()=>{

    const fn = (ev) => {
      const {resource, action, message} = JSON.parse(ev.data)
      if(resource===params.model && ['create','update','delete'].includes(action)){
        findModels(params.query)
      }
    }

    ws.addEventListener('message', fn)
    return ()=>{
      ws.removeEventListener('message', fn)
    } 
  }, [])

  useEffect(()=>{
    findModels(params.query)
  },[])

  async function findModels(query){
    try{
      setLoadingModels(true)
      const recSet = await services.find(params.model, query)
      setLoadingModels(false)
      setModels(recSet)
    }catch(e){
      console.error(e)
      setLoadingModels(false)
      params?.onError(e)
    }
  }

  async function createModel(atts){
    try{
      await services.create(params.model, atts)
      //if(!params.preventUpdate){
        await findModels(params.query)
      //}
    }catch(e){
      console.error(e)
      params?.onError(e)
    }
  }

    return [models, loadingModels, findModels, createModel]
}