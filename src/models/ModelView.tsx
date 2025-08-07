import { Badge, Card, Tabs, Title } from "@mantine/core"
import { model } from '@lib/models/ModelFactory'
import {capitalize} from '@lib/utils/string'
import { useEffect, useState } from "react"
import { Records } from "@lib/models/ModelAdaptor.types"

export function ModelView({name}:{name:string}){
    let [activeRec, setActiveRec] = useState<string | null>(null)
    let [recs, setRecs] = useState<Records>()
    let mod = model(name)
    
    useEffect(()=>{ 
        mod.find().then(setRecs).catch(console.error)
    })
    
    if(!mod || !recs) {
        return
    }
    return <Card>
        <Title ta="center" order={3}>{capitalize(mod.plural ?? '')}</Title>
        <Tabs value={activeRec} onChange={setActiveRec} orientation="vertical">
            <Tabs.List>
                {recs.map((rec)=>{
                    return <Tabs.Tab 
                        key={rec.id} 
                        value={rec.id}
                    >
                        {rec[mod.recordName ?? 'name'] as string}
                    </Tabs.Tab>
                })}
            </Tabs.List>
            
            Details
            
        </Tabs>
    </Card>
}