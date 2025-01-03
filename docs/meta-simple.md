### Eample using out of the box react hooks

```
import { useState, useEffect } from "react"
import { fetchMeta } from "evo-client-lib"

export default function Meta() {
    const [metaModels, setMetaModels] = useState()

    useEffect(()=>{
        fetchMeta()
            .then(setMetaModels)
            .catch(console.error)
    }, [])

    if(!metaModels){
        return <p>Loading</p>
    }

    return (<>
        <h1>Meta Models</h1>   
        <ul>
            {metaModels.map((meta)=>{
                return <li>
                    <h4>{meta.name}</h4>
                    <code><pre>{JSON.stringify(meta,null,2)}</pre></code>
                </li>
            })}
        </ul>
    </>)
}
```
