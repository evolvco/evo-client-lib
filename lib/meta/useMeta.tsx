import {useState, useEffect} from 'react'
import {findall} from './services'
import {useSocket} from '../ws'

  interface Params {
  onError?: (error: any) => void
}

export function useMeta(params: Params = {}) {
  const [metaModels, setMetaModels] = useState()
  const [loadingMetaModels, setLoadingMetaModels] = useState(true)
  const {ws} = useSocket()
  
  function findMetaModels(){
    return findall()
      .then((recs)=>{
        setLoadingMetaModels(false)
        setMetaModels(recs)
      })
      .catch((er: any)=>{
        console.error(er)
        setLoadingMetaModels(false)
        if(params.onError){
          params.onError(er)
        }
      })
  }

  useEffect(()=>{

    const fn = (ev: any) => {
      const {resource, action, message} = JSON.parse(ev.data)
      if(resource==='meta' && ['save'].includes(action)){
        findMetaModels()
      }
    }

    ws?.addEventListener('message', fn)
    return ()=>{
      ws?.removeEventListener('message', fn)
    } 
  }, [])

  useEffect(()=>{
    findMetaModels()
  }, [])

  return {metaModels, loadingMetaModels, setMetaModels}
}