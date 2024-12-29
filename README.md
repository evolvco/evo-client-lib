# EVO SDK
- simplifies tasks such as authentication and authorization

## Server Requirements
- A server somewhere running Evo Server `git@github.com:evolvco/evo-server.git`

## Quick starts
- There are two Quick start repos 
- [Javascript Client](https://github.com/evolvco/evo-micro-app)
- [Typescript Client](https://github.com/evolvco/evo-micro-app-ts)
- the quick starts are configured to use `evo-client-lib` but do not install it so you have to follow the Install section after you clone one of the quickstart projects

## integration into an existing client
### Client Requirements
- If your are not using a quik start package
- Either a proxy directing all traffic from your client going to `/api` and `/ws` to the Evo Server, or setting the domain of the lib using `setRestDomain`, and `setSocketDomain`
- [Proxy example using vite proxy](docs/proxy.md)
- [Set Domains example](docs/set-domains.md)

## install
- clone the lib in the parent folder of your project. from your project root (or quickstart root) run 

```
cd ../
git clone git@github.com:evolvco/evo-client-lib.git
```

- link this package to your project root (or quickstart root) by running the following from your project root.

```npm init -w ../evo-client-lib```

- run from your project root.

```npm i evo-client-lib```

## Authentication
- the quickstarts already integrate Authentication
- follow one of these tutorials if you are integration into an existing project 
- helpers include an AuthProvider and a useAuth hook
- [React Router Example](docs/react-router-auth.md)
- [Simple Example without React Router](docs/simple-auth.md)

## Meta Models
- meta models are json objects that describe the structure of a model. 
- They descibe things like field names and types, validators, join relationships, hooks, exe.

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

## Model Records
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

### Example using a custom hook included in the library
```
import { models } from "evo-client-lib"

export default function ModelRecordsHook() {
    const [recordSet, loading, setRecords] = models.useModel({
        model:'perm'
    })

    if(loading){
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

## Web Sockets
- every meta model can be optionally backed by a web socket
- [Setup](docs/socket-setup.md)

## Components

#### RequireAuth
| Parameter     | Type              | Example   | Options   |
| ---------     | -----------       | --------  | -------   |
| children      | React.Children    |           |           |
| onFailure     | function          | (e)=>{}   |           |
| loader        | React.Node        |           |           |
| loaderClass   | String            |           |           |

#### LoginForm
| Parameter     | Type              | Example   | Options   |
| ---------     | -----------       | --------  | -------   |
| onSuccess     | function          | ()=>{}   |           |
| onFailure     | function          | (e)=>{}   |           |
| formClass   | String            |           |           |
| errorClass   | String            |           |           |
| labelClass   | String            |           |           |
| inputClass   | String            |           |           |
| headerClass   | String            |           |           |
| footerClass   | String            |           |           |
| submitClass   | String            |           |           |
