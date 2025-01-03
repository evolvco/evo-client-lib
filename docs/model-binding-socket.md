## Socket Model Binding Example
- looks familiar doesnt it. 
- currently sockets are purely configuration in the admin 
![socket switch](i/admin-socket.png)
- in `evo-micro-app` or `evo-micro-app-ts` try opening 3 browser windows: one the admin and 2 [web socket client example](http://localhost:6100/web-socket-client-example)

```
import { models } from "evo-client-lib"

export default function SocketExample() {
    const [recordSet, loadingRecords, fetchRecords, createRecord] = models.useModel({
        model: 'event',
        preventUpdate: true
    })
    
    if(loadingRecords){
        return <p>Loading</p>
    }

    const createHandler = async ()=>{
        await createRecord({
            name: `${recordSet.records[0].name} ${Date.now()}`
        })  
    }

    return (<>
        <h1>{`${recordSet.count.filtered}`}</h1> 
        <button onClick={createHandler}>Add One</button> 
        <ul>
            {recordSet.records.map((rec)=>{
                return <li key={rec.id}>{rec.name}</li>
            })}
        </ul>
    </>)
}
```