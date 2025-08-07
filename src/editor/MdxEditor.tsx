import React from 'react'
import {
  MDXEditor,
  MDXEditorMethods,
  markdownShortcutPlugin,
  headingsPlugin,
  linkDialogPlugin,
  listsPlugin,
  directivesPlugin,
  toolbarPlugin,
  quotePlugin,
  diffSourcePlugin,
  linkPlugin,
  sandpackPlugin,
  codeMirrorPlugin,
  imagePlugin,
  frontmatterPlugin,
  codeBlockPlugin,
  tablePlugin,
  jsxPlugin,
  thematicBreakPlugin
} from '@mdxeditor/editor'

import {
  CalloutDirectiveDescriptor,
  InfoDirectiveDescriptor
} from './MdxDirectives'

import {
  PlainTextCodeEditorDescriptor
} from './MdxEditors'

import {
  jsxComponentDescriptors
} from './MdxComponents'

import { simpleSandpackConfig } from './SandpackEditor'

import '@mdxeditor/editor/style.css'
import { MdxToolbar } from './MdxToolbar'

export function MdxEditor({ defaultValue }: { defaultValue: string }) {

  const ref = React.useRef<MDXEditorMethods>(null)

  return <>
  <style scoped>{`
    [data-lexical-editor="true"] {
      background-color: transparent !important
    }
  `}</style>
  <MDXEditor
    className="dark-theme dark-editor"
    ref={ref}
    markdown={defaultValue}
    onChange={console.log}
    plugins={[
      headingsPlugin(),
      linkPlugin(),
      imagePlugin(),
      listsPlugin(),
      quotePlugin(),
      tablePlugin(),
      markdownShortcutPlugin(),
      thematicBreakPlugin(),
      frontmatterPlugin(),
      jsxPlugin({
        jsxComponentDescriptors
      }),
      directivesPlugin({
        directiveDescriptors: [
          CalloutDirectiveDescriptor, 
          InfoDirectiveDescriptor
        ]
      }),
      diffSourcePlugin({
        diffMarkdown: 'An older version',
        viewMode: 'rich-text'
      }),
      codeBlockPlugin({
        defaultCodeBlockLanguage: 'json',
        codeBlockEditorDescriptors: [PlainTextCodeEditorDescriptor]
      }),
      sandpackPlugin({
        sandpackConfig: simpleSandpackConfig
      }),
      codeMirrorPlugin({
        codeBlockLanguages: { js: 'JavaScript', ts:'TypeScript', css: 'CSS', json:'JSON' }
      }),
      linkDialogPlugin({
        linkAutocompleteSuggestions: ['https://virtuoso.dev', 'https://mdxeditor.dev']
      }),
      imagePlugin({
        imageUploadHandler: () => {
          return Promise.resolve('https://picsum.photos/200/300')
        },
        imageAutocompleteSuggestions: ['https://picsum.photos/200/300', 'https://picsum.photos/200']
      }),
      toolbarPlugin({
        toolbarContents: () => (
          <MdxToolbar />
        )
      })
    ]}
  /></>
}