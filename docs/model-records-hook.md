### Example using a custom hook included in the library

```
import { models } from "evo-client-lib"

export default function ModelRecordsHook() {
    const [recordSet, loadingRecords, fetchRecords, createRecord] = models.useModel({
        model:'perm'
    })

    if(loadingRecords){
        return <p>Loading</p>
    }

    return (<>
        <h1>{`${recordSet.count.filtered} Model Records via hook`}</h1>   
        <ul>
            {recordSet.records.map((rec)=>{
                return <li>{rec.name}</li>
            })}
        </ul>
    </>)
}
```