import { Input, Switch, Textarea, Select, Option, MultiInput, Details, MultiSelect } from '@lib/ui'
import { toSpaceCase } from '@lib/utils/string'

interface ModelInfoFieldsProps {
  values: Record<string, any>;
  edit: boolean;
  extendValues: (value: Record<string, any>) => void;
}

export function ModelInfoFields({ values, edit, extendValues }: ModelInfoFieldsProps) {
    let syncLabels = ['Server Only', 'Local Only', 'Offline First (Local -> Cloud -> Devices)', 'Bi-Directional (Cloud <-> Local)', 'Private Backup Only (Local -> Cloud)']
    let syncValues = ['server-only', 'local-only', 'offline-first', 'bi-directional', 'private-backup']

    return (<div className="h-screen">
    <div className="ev-row my-4">
        <Input
            required={true}
            disabled={edit}
            value={values.name}
            className='grow'
            name="name"
            label="Name"
            onChange={(ev:any) => extendValues({ name: ev.target.value })}
        />
        <Input
            required
            value={values.plural}
            name="plural"
            label="Plural Name"
            className='ml-4 grow'
            onChange={(ev:any) => extendValues({ plural: ev.target.value })}
        />
        <Input
            value={values.collection||""}
            name="collection"
            className='ml-4 grow'
            label="Collection Name"
            onChange={(ev:any) => extendValues({ collection: ev.target.value })}
        />
    </div>
    <div className='ev-row my-4'>        
        <Select
            label="Record Display Name Field"
            value={values.recordName || ''}
            name="recordName"
            className='grow'
            onChange={(ev:any) => extendValues({ recordName: ev.target.value })}
        >
            {Object.keys(values.schema).map((attribute) => {
                return <Option key={attribute} value={attribute}>{toSpaceCase(attribute)}</Option>
            })}
        </Select>
        <Select
            label="Record Primary Key Field"
            value={values.primaryKey || ''}
            name="primaryKey"
            className='ml-4 grow'
            onChange={(ev:any) => extendValues({ primaryKey: ev.target.value })}
        >
            {Object.keys(values.schema).map((attribute) => {
                return <Option key={attribute} value={attribute}>{toSpaceCase(attribute)}</Option>
            })}
        </Select>
        <Select
            label="Assign Own Records Field"
            value={values.ownRecordsKey || ''}
            name="ownRecordsKey"
            className='ml-4 grow'
            onChange={(ev:any) => extendValues({ ownRecordsKey: ev.target.value })}
        >
            {Object.keys(values.schema).map((attribute) => {
                return <Option key={attribute} value={attribute}>{toSpaceCase(attribute)}</Option>
            })}
        </Select>
    </div>
    <div className='ev-row my-4 items-center'> 
        <Select
            label="Persistence Sync Strategy"
            value={values.sync || ''}
            className='mr-4 w-[300px]'
            name="sync"
            onChange={(ev:any) => extendValues({ sync: ev.target.value })}
        >
            {syncValues.map((attribute, i) => {
                return <Option key={attribute} value={attribute}>{syncLabels[i]}</Option>
            })}
        </Select>
        {values.sync !== 'local-only' && <Select
            required
            label="Database"
            value={values.database || ''}
            className='mr-4'
            name="database"
            onChange={(ev:any) => extendValues({ database: ev.target.value })}
        >
            {['document','sql'].map((attribute) => {
                return <Option key={attribute} value={attribute}>{toSpaceCase(attribute)}</Option>
            })}
        </Select>}
        <MultiSelect
            options={[{label:'User', value:'user'}, {label:'Refresh Token', value:'refreshToken'}, {label:'Audit', value:'audit'}]}
            className='mr-4 w-[150px]'
            label="Mixins"
            value={values.mixins || ''}
            name="mixins"
            onChange={(val:any) => extendValues({ mixins: val })}    
        />
        {values.sync !== 'local-only' && <Switch 
            className=''
            onChange={(val:boolean)=>extendValues({socket_support: val})} 
            value={values.socket_support?true:false}
            label="Push Notify via Web Socket"
        />}
    </div>
    <Details className='ev-col my-4'  summary='Own Record Permissions'>
       <sub className='flex p-2'>Ingnore this section all together if you do not want to restrict the current user actions to view, read, create, update and delete Only their own records</sub> 
       <div className='ev-row m-2 flex-wrap'>
            <Switch 
                className='m-2'
                onChange={(val:boolean)=>extendValues({view_own_records: val})} 
                value={values.view_own_records?true:false}
                label="Can View Own Records"
            />
            <Switch 
                className='m-2'
                onChange={(val:boolean)=>extendValues({read_own_records: val})} 
                value={values.read_own_records?true:false}
                label="Can Read Own Records"
            />
            <Switch 
                className='m-2'
                onChange={(val:boolean)=>extendValues({create_own_records: val})} 
                value={values.create_own_records?true:false}
                label="Can Create Own Records"
            />
            <Switch 
                className='m-2'    
                onChange={(val:boolean)=>extendValues({update_own_records: val})} 
                value={values.update_own_records?true:false}
                label="Can Update Own Records"
            />
            <Switch 
                className='m-2'    
                onChange={(val:boolean)=>extendValues({delete_own_records: val})} 
                value={values.delete_own_records?true:false}
                label="Can Delete Own Records"
            />
       </div>
    </Details>
    <MultiInput 
        className='my-4'
        value={values.tags}
        label="Tags" 
        onChange={(val:any)=>extendValues({ tags: val })} 
    />
    <MultiSelect
        label="Field Order"
        value={values.order}
        className='grow my-4'
        options={Object.keys(values.schema).map((k) => ({label:k, value:k}))}
        onChange={(val:any) => extendValues({ order: val })}
    />
    <Textarea
        value={values.description || ''}
        name="description"
        className='grow my-4'
        label="Description"
        onChange={(ev:any) => extendValues({ description: ev.target.value })}
    />
</div>)
}

