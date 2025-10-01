import {useState} from 'react'
import {CodeEditor, Menu, MenuItem} from '@lib/ui'

const fns = [{
  label:'Pre Save', value:'pre_save'
},{
  label:'Post Save', value:'post_save'
},{
  label:'Pre Remove', value:'pre_remove'
},{
  label:'Post Remove', value:'post_remove'
},{
  label:'Read VO', value:'read_vo'
}]

interface HooksEditorProps {
  onChange: (value: Record<string, any>) => void;
  value: Record<string, string>;
}

export function HooksEditor({
  onChange,
  value={}
}: HooksEditorProps) {
  const [att, setAtt] = useState(fns[0])

  return (<div className="ev-col">
      <Menu direction='row' className='p-0 m-0'>
        {fns.map((opt)=>{
          return <MenuItem 
            onClick={()=>setAtt(opt)} 
            className={`p-2 ev-fg-700 rounded hover:ev-bg-primary-100 ${att.value===opt.value?"ev-bg-primary-100 ev-fg-primary-500":""}`}
            key={opt.value} 
          >
            {opt.label}
          </MenuItem>
        })}
      </Menu>   
      <CodeEditor 
        key={att.value}
        defaultLanguage="javascript"
        height="200px"
        onChange={(value)=>onChange({[att.value]:value})} 
        value={value[att.value]} 
        options={{
          lineNumbers: 'off',
          glyphMargin: false,
          folding: false,
          minimap: { enabled: false },
          lineDecorationsWidth: 0,
          lineNumbersMinChars: 0
        }}
      />  
  </div>)
}

