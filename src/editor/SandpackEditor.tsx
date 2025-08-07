import { SandpackCodeEditor,  SandpackProvider, SandpackLayout, SandpackFileExplorer, SandpackPreview } from "@codesandbox/sandpack-react";
import { nightOwl } from "@codesandbox/sandpack-themes";;
import {SandpackConfig} from '@mdxeditor/editor'

export function SandpackEditor(){
    const files = {}
    
    return <SandpackProvider
    files={files} 
    theme={nightOwl} 
    template="react"
  >
    <SandpackLayout>
      <SandpackFileExplorer />
      <SandpackCodeEditor closableTabs showTabs />
      <SandpackPreview />
    </SandpackLayout>
  </SandpackProvider>
}

const defaultSnippetContent = `
export default function App() {
  return (
    <div className="App">
      <h1>Hello CodeSandbox</h1>
      <h2>Start editing to see some magic happen!</h2>
    </div>
  );
}
`.trim()

export const simpleSandpackConfig: SandpackConfig = {
  defaultPreset: 'react',
  presets: [
    {
      label: 'React',
      name: 'react',
      meta: 'live react',
      sandpackTemplate: 'react',
      sandpackTheme: 'light',
      snippetFileName: '/App.js',
      snippetLanguage: 'jsx',
      initialSnippetContent: defaultSnippetContent
    }
  ]
}