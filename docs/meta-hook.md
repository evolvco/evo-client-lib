### Example using a custom hook included in the library

```
import { useMeta } from "evo-client-lib"

export default function MetaHook() {
    const {metaModels, loadingMetaModels} = useMeta()

    if(loadingMetaModels){
        return <p>Loading</p>
    }

    return (<>
        <h1>Meta Models via hook</h1>   
        <ul>
            {metaModels.map((meta)=>{
                return <li>{meta.name}</li>
            })}
        </ul>
    </>)
}
```