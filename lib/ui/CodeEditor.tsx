import Editor, { OnChange, OnMount } from '@monaco-editor/react';
import { useRef, useState } from 'react';
import { Alert } from '.';
import { FormFieldBaseProps } from '../types';

let timeout: NodeJS.Timeout | null = null;

function debounce(func: Function, delay: number) {
  return (...args: any[]) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
      timeout = null;
    }, delay);
  };
}

interface CodeEditorProps extends FormFieldBaseProps {
  id?: string;
  defaultLanguage?: string;
  value: any;
  label?: string;
  theme?: string;
  onChange: (value: any) => void;
  height?: string;
  [key: string]: any;
}

export function CodeEditor({
  id,
  defaultLanguage = 'json',
  value,
  label,
  theme = 'vs-dark',
  onChange,
  height = '100vh',
  ...props
}: CodeEditorProps): JSX.Element {
  const editorRef = useRef<any>(null);
  const [invalid, setInvalid] = useState<string | undefined>();

  const handleEditorChange: OnChange = (value: any) => {
    if (value === undefined) return;

    debounce(() => {
      if (defaultLanguage === 'json') {
        try {
          onChange(JSON.parse(value));
          setInvalid(undefined);
        } catch (e: any) {
          setInvalid(e.message);
        }
      } else {
        onChange(value);
      }
    }, 300)();
  };

  const handleMount: OnMount = (editor: any, monaco: any) => {
    editorRef.current = editor;
    setTimeout(() => {
      if (editor && editor.getAction('editor.action.formatDocument')) {
        editor.getAction('editor.action.formatDocument').run();
        setTimeout(() => {
          editor.getAction('editor.action.formatDocument').run();
        }, 200);
      }
    }, 200);
  };

  return (
    <>
      <style>{`
                sl-alert::part(message){
                    padding:3px 10px;
                }
            `}</style>
      <label className="m-2">{label}</label>
      {defaultLanguage === 'json' && (
        <Alert
          className="mx-2 mt-2"
          open
          variant={invalid ? 'danger' : 'success'}
        >
          {invalid || 'Valid'}
        </Alert>
      )}
      <Editor
        key={id}
        onMount={handleMount}
        onChange={handleEditorChange}
        defaultLanguage={defaultLanguage}
        theme={`vs-${theme}`}
        defaultValue={
          defaultLanguage === 'json' ? JSON.stringify(value) : value
        }
        height={height}
        {...props}
      />
    </>
  );
}
