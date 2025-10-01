import { Select, Input, Switch, RelatedModelGrid, Card, MultiSelect } from "@lib/ui";
import { Meta, Field, Action } from "@lib/types";
import { Option } from "@lib/ui";
import { Actions, Schema } from "@lib/types";

interface ActionEditorProps {
    att: string;
    value: Actions;
    schema: Schema;
    onChange: (value: Record<string, Action>) => void;
    metaModels: Meta[];
}
  
export function ActionEditor({
    att, value, schema, onChange, metaModels
  }: ActionEditorProps){
  
    const action: Action = value[att as keyof Actions]
  
    let tagsobj: Record<string, boolean> = {}
    Object.keys(schema).forEach((k)=>{
      //console.log('---k', k, schema[k])
      let def = schema[k].constructor===Array?schema[k][0]:schema[k] as Field
      def._ui_?.tags?.forEach((t)=>{
        tagsobj[t]=true
      })
    })
    console.log('---tagsobj', tagsobj)
    let tags = Object.keys(tagsobj)
    return <div className="h-screen">
      {att!=='remove' && <><MultiSelect
          label="Fields / Order"
          value={action.order}
          className='my-4 z-20'
          options={Object.keys(schema).map((k) => ({label:k, value:k}))}
          onChange={(val) => onChange({[att]:{...action, order:val}})}
      />
      <MultiSelect
          label="Tags / Order"
          value={action.tags_order}
          className='my-4 z-20'
          options={tags.map((t) => ({label:t, value:t}))}
          onChange={(val) => onChange({[att]:{...action, tags_order:val}})}
      />
      <Select
          className='my-4' 
          label="Display Tags in Form as" 
          value={action.tags_display} 
          onChange={(ev:any)=>onChange({[att]:{...action, tags_display:ev.target.value}})}
      >
          <Option value="tabs">Tabs</Option>
          <Option value="collapsible">Collapsible</Option>
          <Option value="fieldset">Fieldset</Option>
          <Option value="">None</Option>
      </Select>
      <MultiSelect
          label="Populate"
          className='my-4'
          value={action.populate}
          options={Object.keys(schema).filter((k)=>{
            let s = schema[k] as Field
            if(s.constructor===Array){
                let sr = s[0] as Field
                return sr.ref
            }
            let sr = s as Field
            return sr.ref
          }).map((k) => ({label:k, value:k}))}
          onChange={(val) => onChange({[att]:{...action, populate:val}})}
      />
      {att==='collection' && <MultiSelect
          label="Default Sort"
          className='my-4'
          value={action.sort}
          options={[...(Object.keys(schema).map((k) => ({label:k, value:k}))), ...(Object.keys(schema).map((k) => ({label:'-'+k, value:'-'+k})))]}
          onChange={(val) => onChange({[att]:{...action, sort:val}})}
      />}
      </>}
  
     <Card title="Notifications" className='m-0 mt-2'>
        <div className="">
          <Switch  
            label="Email"
            className="m-4"
            value={action.notify.email}
            onChange={(val:boolean)=>onChange({[att]:{...action, notify:{...action.notify, email:val}}})}
          />
          {action.notify.email && <RelatedModelGrid
            label="Select User Email Addresses"
            model={metaModels.find((m:Meta)=>m.name==='user') as Meta}
            value={action.notify.email_addresses}
            onChange={(val) => onChange({[att]:{...action, notify:{...action.notify, email_addresses:val}}})}
            many={true}
            collapsible={true}
            fields={['username', 'email', 'role']}
          />}
        </div>
      </Card> 
      
      <Card title="Service" className='m-0'>
          <div className="p-4 ev-row">
              <Switch 
                label="Secure"
                className='flex items-center'
                value={action.service.secure}
                onChange={(val:boolean)=>onChange({[att]:{...action, service:{...action.service, secure:val}}})}
              />
              <Select
                  className='mx-4' 
                  label="Method" 
                  value={action.service.method} 
                  onChange={(ev:any)=>onChange({[att]:{...action, service:{...action.service, method:ev.target.value}}})}
              >
                  <Option value="GET">GET</Option>
                  <Option value="POST">POST</Option>
                  <Option value="PUT">PUT</Option>
                  <Option value="DELETE">DELETE</Option>
              </Select>
              <Input 
                  label="Path" 
                  value={action.service.path} 
                  onChange={(ev:any)=>onChange({[att]:{...action, service:{...action.service, path:ev.target.value}}})}
              />
        </div>
      </Card>
  
    </div>
  }