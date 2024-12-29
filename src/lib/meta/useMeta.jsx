import {useState, useEffect} from 'react'
import {findall} from './services'

export function useMeta(params={}) {
  const [metaModels, setMetaModels] = useState()
  const [loadingMetaModels, setLoadingMetaModels] = useState(true)
  
    useEffect(()=>{
        findall()
            .then((recs)=>{
              setLoadingMetaModels(false)
              setMetaModels(recs)
            })
            .catch((er)=>{
              console.error(er)
              setLoadingMetaModels(false)
              if(params.onError){
                params.onError(er)
              }
            })
    }, [])

    return {metaModels, loadingMetaModels, setMetaModels}
}