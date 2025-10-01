import {useState} from 'react'
import {Menu, MenuItem} from '@lib/ui'  
import { Action, Actions, Meta, Schema } from '@lib/types';
import { ActionEditor } from './ActionEditor';

export interface ActionsEditorProps {
  onChange: (value: Record<string, Action>) => void;
  value: Actions;
  schema: Schema;
  metaModels: Meta[];
}

export function ActionsEditor({
  onChange,
  value, 
  schema,
  metaModels
}: ActionsEditorProps) {
    const keys = Object.keys(value)
    const [att, setAtt] = useState(keys[0])

    return (<div className="ev-col">
      <Menu className='' direction='row'>
        {keys.map((key)=>{
          return <MenuItem 
            onClick={()=>{
             setAtt(key)
            }}
            className={`p-2 ev-fg-700 rounded hover:ev-bg-primary-100 ${att===key?"ev-bg-primary-100 ev-fg-primary-500":""}`}
            key={key} 
          >
            {key}
          </MenuItem>
        })}
      </Menu>   
      <ActionEditor att={att} value={value} schema={schema} onChange={onChange} metaModels={metaModels}/>
  </div>)
}

