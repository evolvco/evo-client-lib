### Eample using out of the box react hooks

```
import { useState, useEffect } from "react"
import { models } from "evo-client-lib"

export default function ModelRecords() {
    const [recordSet, setRecordSet] = useState()

    useEffect(()=>{
        models.find('perm')
            .then(setRecordSet)
            .catch(console.error)
    }, [])

    if(!recordSet){
        return <p>Loading</p>
    }

    return (<>
        <h1>{`${recordSet.count.filtered} Model Records`}</h1>   
        <ul>
            {recordSet.records.map((meta)=>{
                return <li>
                    <h4>{meta.name}</h4>
                    <code><pre>{JSON.stringify(meta,null,2)}</pre></code>
                </li>
            })}
        </ul>
    </>)
}
```